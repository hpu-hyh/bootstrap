$(function () {

  var currentImg = 'none';
  // 准备轮播图数据
  var banners = [
    {
      id:0,
      bigUrl: './img/banner0.png',
      smUrl: './img/banner0_sm.png'
    },
    {
      id:0,
      bigUrl: './img/banner1.png',
      smUrl: './img/banner1_sm.png'
    },
    {
      id:0,
      bigUrl: './img/banner2.png',
      smUrl: './img/banner2_sm.png'
    }
  ];

  // 监听视图窗口尺寸变化
  $(window).on('resize', throttle(function () {
    var winWidth = $(this).outerWidth();
    var isBigScreen = winWidth >= 768;
    if (currentImg === 'none') {
      renderBanner(banners, isBigScreen);
    }
  
    if (currentImg === 'big' && !isBigScreen) {
      renderBanner(banners, isBigScreen);
    }
    if (currentImg === 'small' && isBigScreen) {
      renderBanner(banners, isBigScreen);
    }
 
  }));
  // 代码模拟触发视口变化
  $(window).trigger('resize');

  // 动态渲染数据到页面

  function renderBanner(banners = [], isBigScreen) {
    currentImg = isBigScreen ? 'big' : 'small';
    //停掉上次调用产生的定时器
    $('.carousel').carousel('dispose');
    var htmlString = '';

    banners.forEach(function(item, index) {
      var active = index === 0 ? 'active' : '';
      var imgUrl = isBigScreen ? item.bigUrl : item.smUrl;
      htmlString += `
      <div class='carousel-item ${active}'>
          <img src='${imgUrl}' class='d-block w-100' alt='...'>
        </div>`;
    });

    $('.carousel-inner').empty().append(htmlString);

    // 自动轮播
    $('.carousel').carousel('cycle');
  }
  // renderBanner(banners)
});
