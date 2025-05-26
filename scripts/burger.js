export default function initBurgerMenu() {
    const burgerButton = document.querySelector('.header__burger-button');
    const menu = document.querySelector('.header__menu');

    burgerButton?.addEventListener('click', () => {
        burgerButton.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}