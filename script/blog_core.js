import { Utils } from './utils.js';
import i18n from './i18n.js';

/**
 * BlogCore - 處理部落格核心邏輯
 */
class BlogCore {
    constructor() {
        this.lang = localStorage.getItem('cps_lang') || 'zh';
        this.posts = [];
        this.filteredPosts = [];
        this.currentSeries = Utils.getQueryParam('series') || '全部';
        this.currentSort = 'default';
        
        this.init();
    }

    async init() {
        this.applyTheme();
        await this.loadPosts();
        this.renderUI();
        this.bindEvents();
        Utils.initLazyLoading();
    }

    /**
     * 應用主題設置
     */
    applyTheme() {
        const bgColor = localStorage.getItem('cps_bg_color') || '#ffffff';
        document.body.style.backgroundColor = bgColor;
        this.renderThemeControls();
    }

    /**
     * 渲染主題控制項
     */
    renderThemeControls() {
        if (document.querySelector('.theme-controls')) return;
        
        const controls = document.createElement('div');
        controls.className = 'theme-controls';
        const colors = ['#ffffff', '#f4f4f4', '#e8f5e9', '#fff3e0', '#fce4ec'];
        
        controls.innerHTML = colors.map(color => `
            <div class="color-dot" style="background-color: ${color}" data-color="${color}"></div>
        `).join('');
        
        document.body.appendChild(controls);
        
        controls.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-dot')) {
                const color = e.target.dataset.color;
                document.body.style.backgroundColor = color;
                localStorage.setItem('cps_bg_color', color);
            }
        });
    }

    /**
     * 加載貼文數據
     */
    async loadPosts() {
        const postCount = 15; // 這裡可以優化為動態獲取，目前保留原邏輯
        const suffix = this.lang === 'zh' ? '_zh.txt' : '_en.txt';
        const baseUrl = 'https://vvvictorzhou.github.io/CPS/doc/';

        const fetchPromises = Array.from({ length: postCount }, (_, i) => {
            const fileName = `blog${i + 1}${suffix}`;
            return fetch(baseUrl + fileName)
                .then(res => res.ok ? res.text() : null)
                .then(text => text ? { ...Utils.parsePost(text), fileName } : null)
                .catch(() => null);
        });

        const results = await Promise.all(fetchPromises);
        this.posts = results.filter(p => p !== null);
        this.applyFilters();
    }

    /**
     * 應用篩選與排序
     */
    applyFilters() {
        let filtered = [...this.posts];

        // 系列篩選
        if (this.currentSeries !== '全部') {
            filtered = filtered.filter(p => p.series === this.currentSeries);
        }

        // 排序
        switch (this.currentSort) {
            case 'date-desc':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date-asc':
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'likes':
                filtered.sort((a, b) => (parseInt(b.likes) || 0) - (parseInt(a.likes) || 0));
                break;
        }

        this.filteredPosts = filtered;
        this.renderPosts();
    }

    /**
     * 渲染貼文列表
     */
    renderPosts() {
        const container = document.getElementById('posts-container');
        if (!container) return;

        if (this.filteredPosts.length === 0) {
            container.innerHTML = `<div class="no-posts">${this.lang === 'zh' ? '找不到相關貼文' : 'No posts found'}</div>`;
            return;
        }

        container.innerHTML = this.filteredPosts.map(post => `
            <div class="blog-posts-item" onclick="location.href='post_${this.lang}_index.html?file=${post.fileName}'">
                <img data-src="../img/blogs/${post.image}" alt="${post.title}" class="blog-posts-item-img">
                <div class="blog-posts-item-content">
                    <h3 class="blog-posts-item-title">${post.title}</h3>
                    <h5 class="blog-posts-item-date">${post.date}</h5>
                    <p class="blog-posts-item-text">${post.subTitle || post.content.substring(0, 100) + '...'}</p>
                </div>
            </div>
        `).join('');
        
        Utils.initLazyLoading();
    }

    /**
     * 渲染 UI 文本（多語言）
     */
    renderUI() {
        const texts = i18n[this.lang];
        document.title = texts.title;
        // 這裡可以遍歷所有帶有 data-i18n 屬性的元素進行替換
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (texts[key]) el.textContent = texts[key];
        });
    }

    /**
     * 綁定事件
     */
    bindEvents() {
        // 系列選擇
        const seriesSelect = document.getElementById('series-select');
        if (seriesSelect) {
            seriesSelect.value = this.currentSeries;
            seriesSelect.addEventListener('change', (e) => {
                this.currentSeries = e.target.value;
                this.applyFilters();
            });
        }

        // 排序選擇
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applyFilters();
            });
        }

        // 語言切換
        document.querySelectorAll('.lang-switch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.lang = this.lang === 'zh' ? 'en' : 'zh';
                localStorage.setItem('cps_lang', this.lang);
                location.reload();
            });
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.blogApp = new BlogCore();
});
