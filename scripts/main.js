// main.js
import initSlider from './slider.js';
import initAccordion from './accordion.js';
import initBurgerMenu from './burger.js';
import { loadDestination } from './loadDestination.js';

document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    initAccordion();
    initBurgerMenu();
    loadDestination();
});