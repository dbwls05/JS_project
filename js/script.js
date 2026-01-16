$(function () {
  /* =====================
     PC GNB 서브메뉴
  ===================== */
  if ($(".menu").length) {
    $(".menu > li").hover(
      function () {
        $(this).find(".submenu").stop().slideDown(200);
      },
      function () {
        $(this).find(".submenu").stop().slideUp(200);
      }
    );
  }

  // /* =====================
  //    메인 슬라이드
  // ===================== */
  // if ($(".imgslide").length) {
  //   let idx = 0;
  //   const $slides = $(".imgslide > a");
  //   $slides.hide().eq(0).show();

  //   setInterval(function () {
  //     $slides.eq(idx).fadeOut(600);
  //     idx = (idx + 1) % $slides.length;
  //     $slides.eq(idx).fadeIn(600);
  //   }, 4000);
  // }
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slide-track");
  let isMoving = false;

  function slideNext() {
    if (isMoving) return;
    isMoving = true;

    track.style.transition = "transform 0.6s ease";
    track.style.transform = "translateX(-100%)";

    track.addEventListener("transitionend", function handler() {
      track.removeEventListener("transitionend", handler);

      track.style.transition = "none";
      track.appendChild(track.firstElementChild);
      track.style.transform = "translateX(0)";

      isMoving = false;
    });
  }

  setInterval(slideNext, 3000);

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
    });
  });

  document.querySelectorAll(".mobile-title").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.nextElementSibling.classList.toggle("active");
    });
  });
});
