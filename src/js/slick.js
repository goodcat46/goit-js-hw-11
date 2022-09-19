$(document).ready(function () {
  // тут вказується клас DIVчика яз якого потрібно зробити слайдер
  $('.slick-slider-container').slick({
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    // responsive: [
    //   {
    //     breakpoint: 1100,
    //     settings: {
    //       arrows: false,
    //       // centerMode: true,
    //       // centerPadding: '40px',
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       arrows: false,
    //       // centerMode: true,
    //       // centerPadding: '40px',
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],

    prevArrow: '<button type="button" class="slick-prev">&#60;</button>',
    nextArrow: '<button type="button" class="slick-next">&#62;</button>',
  });
});