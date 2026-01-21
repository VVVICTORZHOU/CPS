/**
 * CPS Project Utilities
 * 包含數據解析、性能優化與通用工具函數
 */

export const Utils = {
    /**
     * 解析自定義格式的貼文內容
     * @param {string} content 原始文本內容
     * @returns {Object} 解析後的貼文對象
     */
    parsePost(content) {
        const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
        const post = {};
        let currentField = null;
        let isCapturing = false;
        let contentBuffer = [];

        const fieldMap = {
            '貼文中文標題': 'title',
            '貼文英文標題': 'title',
            '貼文中文子標題': 'subTitle',
            '貼文英文子標題': 'subTitle',
            '貼文創建日期': 'date',
            '貼文封面圖片名稱': 'image',
            '貼文中文標籤': 'tags',
            '貼文英文標籤': 'tags',
            '貼文作者': 'author',
            '貼文強制釘選': 'pinned',
            '貼文點讚數': 'likes',
            '貼文格式': 'format',
            '永續發展目標': 'sdgs',
            '貼文系列': 'series',
            '貼文內容': 'content'
        };

        lines.forEach(line => {
            if (line.startsWith('<註解>')) {
                for (const [key, value] of Object.entries(fieldMap)) {
                    if (line.includes(key)) {
                        currentField = value;
                        break;
                    }
                }
                isCapturing = false;
            } else if (line.startsWith('<範例>')) {
                isCapturing = true;
            } else if (isCapturing && currentField) {
                const cleanLine = line.trim().replace(/<br>/g, '');
                if (currentField === 'content') {
                    contentBuffer.push(cleanLine);
                } else if (currentField === 'sdgs') {
                    post[currentField] = cleanLine.split(',').map(s => s.trim());
                } else {
                    post[currentField] = cleanLine;
                }
            }
        });

        if (contentBuffer.length > 0) {
            post.content = contentBuffer.join('');
        }

        return post;
    },

    /**
     * 圖片懶加載處理
     */
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    },

    /**
     * 獲取 URL 參數
     */
    getQueryParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    },

    /**
     * 防抖函數
     */
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};
