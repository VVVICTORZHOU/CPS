// 彈窗側邊菜單
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const body = document.body;
    const overlay = document.querySelector('.sidebar-overlay');
    
    // 打開側邊欄
    menuToggle.addEventListener('click', function() {
        body.classList.add('sidebar-open');
    });
    
    // 關閉側邊欄 - 兩種方式
    sidebarClose.addEventListener('click', function() {
        body.classList.remove('sidebar-open');
    });
    
    // 點擊遮罩時關閉側邊欄
    overlay.addEventListener('click', function() {
        body.classList.remove('sidebar-open');
    });
    
    // 響應式調整
    function handleResize() {
        if (window.innerWidth > 1024) {
            body.classList.remove('sidebar-open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // 初始化調用一次
    handleResize();
});

// 輪播
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicators button');
    const prevButton = carousel.querySelector('.carousel-control-prev');
    const nextButton = carousel.querySelector('.carousel-control-next');
    
    let currentIndex = 0;
    let intervalId = null;
    const interval = 3000; // 輪播間隔時間（毫秒）
    
    // 初始化輪播
    function initCarousel() {
        updateSlidePosition();
        startAutoPlay();
    }
    
    // 更新輪播位置
    function updateSlidePosition() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    }
    
    // 更新指示器狀態
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 切換到指定的輪播項目
    function goToSlide(index) {
        currentIndex = index;
        
        // 處理循環
        if (currentIndex >= items.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        
        updateSlidePosition();
    }
    
    // 下一張幻燈片
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // 上一張幻燈片
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // 開始自動播放
    function startAutoPlay() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, interval);
    }
    
    // 停止自動播放
    function stopAutoPlay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    
    // 事件監聽器
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // 為每個指示器添加點擊事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // 滑鼠懸停時暫停自動播放
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // 觸摸事件處理
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // 最小滑動距離
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startAutoPlay();
    });
    
    // 防止拖動圖片
    carousel.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
    
    // 初始化輪播
    initCarousel();
});


// 彈窗搜索框
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn1');
    const searchPopup = document.querySelector('.search-popup');
    const searchClose = document.querySelector('.search-popup-close');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const body = document.body;
    
    // 打開搜索彈窗
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 如果側邊欄已打開，則關閉側邊欄
        if (body.classList.contains('sidebar-open')) {
            body.classList.remove('sidebar-open');
            // 給側邊欄一點時間關閉後再打開搜索彈窗
            setTimeout(() => {
                searchPopup.classList.add('active');
                searchInput.focus();
                document.body.style.overflow = 'hidden';
            }, 300); // 等待側邊欄關閉動畫完成
        } else {
            searchPopup.classList.add('active');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        }
    });
    
    // 關閉搜索彈窗
    searchClose.addEventListener('click', function() {
        searchPopup.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // ESC鍵關閉彈窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchPopup.classList.contains('active')) {
            searchPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 提交搜索
    searchSubmit.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('搜索關鍵字:', searchTerm);
            window.location.href = 'blog_zh_index.html';
        }
    });
    
    // Enter鍵提交搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('搜索關鍵字:', searchTerm);
                window.location.href = 'blog_zh_index.html';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn2');
    const searchPopup = document.querySelector('.search-popup');
    const searchClose = document.querySelector('.search-popup-close');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const body = document.body;
    
    // 打開搜索彈窗
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 如果側邊欄已打開，則關閉側邊欄
        if (body.classList.contains('sidebar-open')) {
            body.classList.remove('sidebar-open');
            // 給側邊欄一點時間關閉後再打開搜索彈窗
            setTimeout(() => {
                searchPopup.classList.add('active');
                searchInput.focus();
                document.body.style.overflow = 'hidden';
            }, 300); // 等待側邊欄關閉動畫完成
        } else {
            searchPopup.classList.add('active');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        }
    });
    
    // 關閉搜索彈窗
    searchClose.addEventListener('click', function() {
        searchPopup.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // ESC鍵關閉彈窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchPopup.classList.contains('active')) {
            searchPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 提交搜索
    searchSubmit.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('搜索關鍵字:', searchTerm);
            window.location.href = 'blog_zh_index.html';
        }
    });
    
    // Enter鍵提交搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('搜索關鍵字:', searchTerm);
                window.location.href = 'blog_zh_index.html';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn1 = document.querySelector('.search-btn1');

    searchBtn1.addEventListener('click', function() {
        // 跳轉到 blog_zh_index.html，並傳遞查詢參數來打開搜索彈窗
        window.location.href = 'blog_zh_index.html?search=open';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn2 = document.querySelector('.search-btn2');

    searchBtn2.addEventListener('click', function() {
        // 跳轉到 blog_zh_index.html，並傳遞查詢參數來打開搜索彈窗
        window.location.href = 'blog_zh_index.html?search=open';
    });
});

// 首頁部落格貼文動態載入和排序功能
document.addEventListener('DOMContentLoaded', function() {
    // 讀取 doc 目錄下的所有 txt 檔案作為貼文數據
    let blogData = {
        fileName: [],
        postTitle: [],
        postSubTitle: [],
        postDate: [],
        postImage: [],
        postTagsZh: [],
        postTagsEn: [],
        postAuthor: [],
        postPinned: [],
        postLikes: [],
        postFormat: [],
        postSDGs: [],
        postSeries: [],
        postContent: []
    };

    // Predefine a list of possible files (from blog1_zh.txt to blog99_zh.txt)
    const files = Array.from({ length: 10 }, (_, i) => `blog${i + 1}_zh.txt`);

    // Define patterns for comments and examples
    const commentPattern = /^<註解>/;
    const examplePattern = /^<範例>/;

    // Fetch and process each file
    Promise.all(
        files.map(file => fetch(`https://vvvictorzhou.github.io/CPS/doc/${file}`).then(response => {
            if (response.ok) {
                return response.text();  // Only proceed if the file exists
            } else {
                console.warn(`File not found: ${file}`);
                return null;  // Return null for non-existent files
            }
        }))
    ).then(contents => {
        console.log('Files fetched:', contents);
        contents.forEach((content, fileIndex) => {
            if (!content) return;  // Skip processing if the file wasn't found

            const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');  // Remove empty lines
            let nextLineToCapture = false;
            let currentField = null;
            let postContentCapture = false;
            let postContentBuffer = '';

            lines.forEach(line => {
                if (commentPattern.test(line)) {
                    // Assign the correct field based on the comment
                    if (line.includes('貼文中文標題')) currentField = 'postTitle';
                    if (line.includes('貼文中文子標題')) currentField = 'postSubTitle';
                    if (line.includes('貼文創建日期')) currentField = 'postDate';
                    if (line.includes('貼文封面圖片名稱')) currentField = 'postImage';
                    if (line.includes('貼文中文標籤')) currentField = 'postTagsZh';
                    if (line.includes('貼文英文標籤')) currentField = 'postTagsEn';
                    if (line.includes('貼文作者')) currentField = 'postAuthor';
                    if (line.includes('貼文強制釘選')) currentField = 'postPinned';
                    if (line.includes('貼文點讚數')) currentField = 'postLikes';
                    if (line.includes('貼文格式')) currentField = 'postFormat';
                    if (line.includes('貼文系列')) currentField = 'postSeries';
                    if (line.includes('永續發展目標')) {
                        // 本變數也是單行字串，例如 13,17，請以逗號,作為分隔，將各個檔案的 SDGs 皆以子陣列形式存放入此變數
                        currentField = 'postSDGs';
                        //blogData.postSDGs.push(line.split(',').map(sdg => sdg.trim()));
                    }
                    if (line.includes('貼文內容')) {
                        currentField = 'postContent';
                        postContentCapture = true;
                    } else {
                        postContentCapture = false;
                    }
                } else if (examplePattern.test(line)) {
                    // Capture the next line for fields other than postContent
                    nextLineToCapture = true;
                } else if (nextLineToCapture && currentField !== 'postContent') {
                    // Capture the data for the current field
                    blogData[currentField].push(line.trim().replace(/<br>/g, ''));
                    nextLineToCapture = false;
                } else if (postContentCapture) {
                    // Special handling for postContent (multiple lines)
                    postContentBuffer += line.trim().replace(/<br>/g, '');
                }
            });

            // Add postContent after concatenating all lines
            if (postContentBuffer) {
                blogData.postContent.push(postContentBuffer);
            }

            // Add the file name
            blogData.fileName.push(files[fileIndex]);
        });

        // Output the collected data
        console.log(blogData.fileName);
        console.log(blogData.postTitle);
        console.log(blogData.postSubTitle);
        console.log(blogData.postDate);
        console.log(blogData.postImage);
        console.log(blogData.postTagsZh);
        console.log(blogData.postTagsEn);
        console.log(blogData.postAuthor);
        console.log(blogData.postPinned);
        console.log(blogData.postLikes);
        console.log(blogData.postFormat);
        console.log(blogData.postSDGs);
        console.log(blogData.postSeries);
        console.log(blogData.postContent);

        // 初始載入貼文
        loadPosts();


        // 主題排序
        const postSDGs = blogData.postSDGs;  // Array for SDG data (e.g., ["13,17"])
        const postTagsZh = blogData.postTagsZh;  // Array for tags (e.g., ["#碳中和#氣候變遷"])

        const sdgCounts = {};
        const tagCounts = {};


        // Count SDGs and Tags
        countOccurrences(postSDGs, sdgCounts, ',');
        countOccurrences(postTagsZh, tagCounts, '#');


        // Initial chart load for Tags
        createBarChart(tagCounts, 'bar-chart-container');

        // Initial chart load for SDGs
        //createSDGsChart(sdgCounts, 'sdg-chart-container');


    }).catch(error => {
        console.error('Error fetching files:', error);
    });

    // 獲取DOM元素
    const postsContainer = document.getElementById('posts-container');
    
    // 創建貼文元素的函數
    function createPostElement(index) {
        const postData = {
            fileName: blogData.fileName[index],
            title: blogData.postTitle[index],
            subTitle: blogData.postSubTitle[index],
            date: blogData.postDate[index],
            image: '../img/' + blogData.postImage[index],
            tags: blogData.postTagsZh[index].split('#').filter(tag => tag !== '').map(tag => tag.trim()),
            author: blogData.postAuthor[index],
            pinned: blogData.postPinned[index] === '1',
            likes: blogData.postLikes[index],
            series: blogData.postSeries[index],
            content: blogData.postContent[index]
        };
    
        // 計算該貼文是否在 20 天內
        const postDate = new Date(postData.date.replace(/\//g, '-'));
        const today = new Date();
        const timeDiff = today - postDate;
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
    
        // 創建貼文元素
        const postElement = document.createElement('div');
        postElement.className = 'blog-posts-item';
        postElement.dataset.date = postDate.getTime();
        postElement.dataset.likes = parseInt(postData.likes);
        postElement.dataset.pinned = postData.pinned ? '1' : '0';
        postElement.dataset.fileName = postData.fileName;
        postElement.dataset.series = postData.series;
    
        // 更新 series 圖示
        seriesText = postData.series;
        let logoUrl = '';
        switch (seriesText) {
        case 'NTUCA':    
            logoUrl = '../img/ntuca_logo.png';
            break;
        case 'USSHKU':
            logoUrl = '../img/hkuuss_logo.png';
            break;
        default:
            logoUrl = '../img/ntuca_logo.png';
        }
    
        // 設置貼文 HTML 結構
        postElement.innerHTML = `
            <div style="position: relative;">
                <img src="${postData.image}" alt="${postData.title}" class="blog-posts-item-img">
                ${dayDiff <= 20 ? '<div class="new-label">NEW</div>' : ''}
            </div>
            <div class="blog-posts-item-content">
                <h3 class="blog-posts-item-title">${postData.title}</h3>
                <div class="blog-posts-item-tags">
                    ${postData.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <div class="blog-posts-item-interactions">
                    <span class="blog-posts-item-date">${postData.date}</span>
                    <span class="blog-posts-item-likes"><i class="fas fa-heart"></i> ${postData.likes}</span>
                    ${postData.pinned ? '<span class="blog-posts-item-pinned"><i class="fas fa-thumbtack"></i></span>' : ''}
                    <span class="blog-posts-item-series">
                        <i class="fas fa-paperclip"></i> 
                        <img src="${logoUrl}" alt="${logoUrl}" style="height: 16px; width: 16px; vertical-align: middle; margin-right: 3px;">
                        ${postData.series}
                    </span>
                </div>
                <p class="blog-posts-item-text">${postData.subTitle}</p>
            </div>
        `;
    
    
        return postElement;
    }
    
    // 排序貼文的函數
    function sortPosts(method) {
        // 獲取所有貼文元素
        const posts = Array.from(postsContainer.children);
        
        // 根據選擇的方法進行排序
        switch(method) {
            case 'date-desc':
                posts.sort((a, b) => b.dataset.date - a.dataset.date);
                break;
            case 'date-asc':
                posts.sort((a, b) => a.dataset.date - b.dataset.date);
                break;
            case 'likes':
                posts.sort((a, b) => b.dataset.likes - a.dataset.likes);
                break;
            default: // 預設排序：先釘選，再按日期倒序
                posts.sort((a, b) => {
                    if (a.dataset.pinned !== b.dataset.pinned) {
                        return b.dataset.pinned - a.dataset.pinned;
                    }
                    return b.dataset.date - a.dataset.date;
                });
                break;

        }
        
        // 清空容器並按新順序添加貼文
        postsContainer.innerHTML = '';
        posts.forEach(post => postsContainer.appendChild(post));
    }
    
    // 初始載入所有貼文
    function loadPosts() {
        postsContainer.innerHTML = ''; // 清空容器


        // 為每個貼文創建元素並添加到容器
        for (let i = 0; i < blogData.postTitle.length; i++) {
            const postElement = createPostElement(i);
            postsContainer.appendChild(postElement);
        }
        
        // 應用默認排序
        sortPosts('default');

        // 僅取前 3 篇貼文，其餘隱藏
        const posts = Array.from(postsContainer.children);
        posts.slice(3).forEach(post => post.style.display = 'none');
    }

    // Helper function to count occurrences
    function countOccurrences(array, countObj, separator) {
        array.forEach(item => {
            const elements = item.split(separator).filter(Boolean);
            elements.forEach(el => {
                const trimmedEl = el.trim();
                countObj[trimmedEl] = (countObj[trimmedEl] || 0) + 1;
            });
        });
    }

    // Create bar chart for Tag data
    function createBarChart(data, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';  // Clear previous content

        const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 10);  // Top 10 items

        // 找出最大數量，將其用作 100% 參考點
        const maxCount = sortedData[0][1];
        
        sortedData.forEach(([key, count]) => {
            const barItem = document.createElement('div');
            barItem.classList.add('bar-item');

            // 設置長條的比例寬度，最大數據為 100%，其他按比例調整
            const barWidthPercentage = (count / maxCount) * 70;
            
            // 創建長條元素
            barItem.innerHTML = `
                <span class="bar-label">${key}</span>
                <div class="bar-fill" style="width: 0;"><span class="bar-count">${count}</span></div>
            `;
            container.appendChild(barItem);

            //barItem.dataset.width = barWidthPercentage; // 將寬度數據存儲在 dataset 中
            // Animate bar fill after rendering
            setTimeout(() => {
                barItem.querySelector('.bar-fill').style.width = `${barWidthPercentage}%`;
            }, 500);  // Delay for smoother animation
        });
    }


    // Create SDGs chart !
    function createSDGsChart(data, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        container.className = 'sdg-circles';
        
        const maxCount = Math.max(...Object.values(data));
        
        for (let i = 1; i <= 17; i++) {
            const count = data[i] || 0;
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            const circumference = 2 * Math.PI * 40; // 半徑40的圓周長
            const offset = circumference - (percentage / 100) * circumference;
            
            const sdgItem = document.createElement('div');
            sdgItem.className = 'sdg-circle-item';
            
            sdgItem.innerHTML = `
                <div class="progress-ring">
                    <svg>
                        <circle class="progress-ring-bg" cx="45" cy="45" r="40"></circle>
                        <circle class="progress-ring-fill" cx="45" cy="45" r="40"
                                style="stroke-dashoffset: ${offset};"></circle>
                    </svg>
                    <img src="https://vvvictorzhou.github.io/ntuca/img/sdgs/sdgs${i}.png" 
                         alt="SDG ${i}" class="sdg-mini-image">
                </div>
                <div class="sdg-info">
                    <div class="sdg-number">SDG ${i}</div>
                    <div>${count} 篇</div>
                </div>
            `;
            
            container.appendChild(sdgItem);
        }
    }
});

// 點擊 .bar-item 跳轉道 blog_zh_index.html?tag=xxx
document.addEventListener('click', function(e) {
    const barItem = e.target.closest('.bar-item');
    if (!barItem) return;

    const tag = barItem.querySelector('.bar-label').textContent;
    window.location.href = `blog_zh_index.html?tag=${encodeURIComponent(tag)}`;
});

// 點擊貼文跳轉到貼文頁面
const postsContainer = document.getElementById('posts-container');
postsContainer.addEventListener('click', function(e) {
    const postElement = e.target.closest('.blog-posts-item');
    if (!postElement) return;

    const postFileName = postElement.dataset.fileName;
    window.location.href = `post_zh_index.html?post_file_name=${encodeURIComponent(postFileName)}`;
});

// 寄送電子郵件
function sendMail() {
    var email = "contact@example.com"; // 收件人電子郵件地址
    var subject = "An Email for NTUCA"; // 電子郵件主題
    var body = "Please write your message here."; // 電子郵件內容
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


// 部落格子選單展開/收合
document.addEventListener('DOMContentLoaded', function () {
    // 行動版：控制部落格子選單展開/收合
    const blogToggle = document.querySelector('.sidebar-blog-toggle');
    const sidebarSubmenu = document.querySelector('.sidebar-submenu');

    if (blogToggle) {
        blogToggle.addEventListener('click', function (e) {
            e.preventDefault();
            sidebarSubmenu.style.display = sidebarSubmenu.style.display === 'block' ? 'none' : 'block';
            blogToggle.classList.toggle('active');
        });
    }
});





