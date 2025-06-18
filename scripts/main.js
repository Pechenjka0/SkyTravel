// main.js
import initSlider from './slider.js';
import initAccordion from './accordion.js';
import initBurgerMenu from './burger.js';
import { loadDestination } from './loadDestination.js';
import { setupThemeDropdown } from './themeFilterDropdown.js';
import { setupActiveThemeTags } from './themeTags.js';
import { setupSelectFilters } from './selectFilters.js';
import { setupFiltersApply } from './filterCards.js';
import { setupSearchFilter } from './searchFilter.js';
import { setupSubscribeForm } from './subscribeMessage.js';
import { setupContactFormMessage } from './contactFormMessage.js';

setupSubscribeForm();
setupContactFormMessage();

document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    initAccordion();
    initBurgerMenu();
    loadDestination();
    setupThemeDropdown();
    setupActiveThemeTags();
    setupSelectFilters();
    setupFiltersApply();
    setupSearchFilter();
});

