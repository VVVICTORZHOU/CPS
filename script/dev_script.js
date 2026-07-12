const langSelect = document.getElementById('langSelect');
const labelTitle = document.getElementById('labelTitle');
const labelSubTitle = document.getElementById('labelSubTitle');

// 語言切換邏輯
langSelect.addEventListener('change', () => {
    const isZh = langSelect.value === 'zh';
    labelTitle.innerText = isZh ? '貼文中文標題' : '貼文英文標題';
    labelSubTitle.innerText = isZh ? '貼文中文子標題' : '貼文英文子標題';
});

document.getElementById('btnDownload').addEventListener('click', () => {
    const form = document.getElementById('postForm');
    if (!form.checkValidity()) {
        alert("請確認所有欄位已正確填寫！Please Ensure All Fields are Inputted Correctly!");
        return;
    }

    const data = {
        title: document.getElementById('title').value,
        subTitle: document.getElementById('subTitle').value,
        date: document.getElementById('date').value.replace(/-/g, '/'),
        img: document.getElementById('imgName').value,
        tagsZh: document.getElementById('tagsZh').value.replace(/\s+/g, ''),
        tagsEn: document.getElementById('tagsEn').value.replace(/\s+/g, ''),
        author: document.getElementById('author').value,
        pinned: document.getElementById('isPinned').value,
        likes: document.getElementById('likes').value,
        fmt: document.getElementById('format').value,
        sdgs: document.getElementById('sdgs').value.replace(/\s+/g, ''),
        series: document.getElementById('series').value
    };

    const isZh = langSelect.value === 'zh';
    let content = `<註解> ${isZh ? '貼文中文標題' : '貼文英文標題'}\n<範例> 訪談偉大的企業家: 王大明\n${data.title}\n\n`;
    content += `<註解> ${isZh ? '貼文中文子標題' : '貼文英文子標題'}\n<範例> 一篇有關於偉大的企業家王大明先生的專訪\n${data.subTitle}\n\n`;
    content += `<註解> 貼文創建日期 (格式為 YYYY/MM/DD)\n<範例> 2025/05/01\n${data.date}\n\n`;
    content += `<註解> 貼文封面圖片名稱\n<範例> interview_with_wang_da_ming.png\n${data.img}\n\n`;
    content += `<註解> 貼文中文標籤\n<範例> #企業家#訪談\n${data.tagsZh}\n\n`;
    content += `<註解> 貼文英文標籤\n<範例> #entrepreneur#interview\n${data.tagsEn}\n\n`;
    content += `<註解> 貼文作者\n<範例> N/A\n${data.author}\n\n`;
    content += `<註解> 貼文強制釘選\n<範例> 0\n${data.pinned}\n\n`;
    content += `<註解> 貼文點讚數\n<範例> 0\n${data.likes}\n\n`;
    content += `<註解> 貼文格式\n<範例> 0\n${data.fmt}\n\n`;
    content += `<註解> 永續發展目標\n<範例> 1,2,3\n${data.sdgs}\n\n`;
    content += `<註解> 貼文系列\n<範例> NTUCA\n${data.series}\n\n`;
    content += `<註解> 貼文內容 (請遵循 html 語法撰寫)\n<範例> <h>第一章...</h>\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `post_${langSelect.value}.txt`;
    a.click();
});