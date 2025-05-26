export default function initSlider() {
    new Swiper('.swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768.98: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            480.98: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            300.98: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        },
    });
}