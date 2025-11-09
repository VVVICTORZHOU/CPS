// ga.js - GA4 追蹤碼
(function() {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-M2NJ10LNRZ";
    document.head.appendChild(gtagScript);
  
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag; // 對外暴露
    gtag('js', new Date());
    gtag('config', 'G-M2NJ10LNRZ');
    gtag('event', 'view_post', {
        'post_file_name': new URLSearchParams(window.location.search).get('post_file_name')
      });
  })();
  