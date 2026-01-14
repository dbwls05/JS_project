$(function () {
  // 1) 메뉴 : 마우스 오버 시 서브메뉴 표시
  $(".menu > li").hover(
    function () {
      $(this).find(".submenu").stop().slideDown(200);
    },
    function () {
      $(this).find(".submenu").stop().slideUp(200);
    }
  );

  // 2) 슬라이드 : 3초 간격 Fade
  let idx = 0;
  const $slides = $(".imgslide > a");
  $slides.hide().eq(0).show();

  setInterval(function () {
    $slides.eq(idx).fadeOut(600);
    idx = (idx + 1) % $slides.length;
    $slides.eq(idx).fadeIn(600);
  }, 3000);

  

  
});


