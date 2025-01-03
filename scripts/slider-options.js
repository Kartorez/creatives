const swiper = new Swiper('.swiper', {
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 30
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1024:{
        slidesPerView: 3,
        spaceBetween: 30
    }
  },
    loop:true,
  });