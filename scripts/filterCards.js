export function setupFiltersApply() {
    const container = document.querySelector('[data-filters-inner]');
    const applyBtn = container.querySelector('[data-filters-apply]');
    const clearBtn = container.querySelector('[data-filters-clear]');
    const regionSelect = container.querySelector('[data-filter-region]');
    const priceSelect = container.querySelector('[data-filter-price]');
    const themeCheckboxes = container.querySelectorAll('[data-filter-option]');
    const activeFiltersWrapper = container.querySelector('[data-active-wrapper]');
    const activeFiltersContainer = container.querySelector('[data-active-filters]');
    const cards = document.querySelectorAll('[data-card]');
    const groups = document.querySelectorAll('[data-card-group]');
    const emptyMessage = document.querySelector('[data-empty-message]');

    // Объект для хранения текущих фильтров
    const currentFilters = {
        region: null,
        price: null,
        themes: []
    };

    // Функция обновления активных фильтров в UI
    function updateActiveFiltersUI() {
        activeFiltersContainer.innerHTML = '';

        // Добавляем регион, если выбран
        if (currentFilters.region) {
            const tag = createFilterTag(currentFilters.region, 'region');
            activeFiltersContainer.appendChild(tag);
        }

        // Добавляем цену, если выбрана
        if (currentFilters.price) {
            const priceLabel = getPriceLabel(currentFilters.price);
            const tag = createFilterTag(priceLabel, 'price');
            activeFiltersContainer.appendChild(tag);
        }

        // Добавляем темы
        currentFilters.themes.forEach(theme => {
            const tag = createFilterTag(theme, 'theme');
            activeFiltersContainer.appendChild(tag);
        });

        // Показываем/скрываем контейнер активных фильтров
        activeFiltersWrapper.hidden = !currentFilters.region && !currentFilters.price && currentFilters.themes.length === 0;
    }

    // Функция создания элемента тега фильтра
    function createFilterTag(value, type) {
        const tag = document.createElement('div');
        tag.className = 'filters__tag';
        tag.dataset.tagType = type;
        tag.dataset.tagValue = value;

        tag.innerHTML = `
            <span>${value}</span>
            <button class="filters__tag-remove" aria-label="Удалить фильтр">
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.179 10.39 6 7.205 2.82 10.39 2.11 9.68 5.29 6.5 2.11 3.32 2.82 2.61 6 5.795 9.179 2.615 9.884 3.32 6.704 6.5 9.884 9.68 9.179 10.39Z"/>
          </svg>
            </button>
        `;

        return tag;
    }

    // Функция получения текстового описания для цены
    function getPriceLabel(priceValue) {
        switch (priceValue) {
            case 'low': return 'до 50 000 ₽';
            case 'mid': return '50 000 — 150 000 ₽';
            case 'high': return 'свыше 150 000 ₽';
            default: return priceValue;
        }
    }

    // Основная функция фильтрации
    function applyFilters() {
        // Обновляем текущие фильтры
        currentFilters.region = regionSelect.value !== 'Регион/Континент' ? regionSelect.value : null;
        currentFilters.price = priceSelect.value !== 'Диапазон цены' ? priceSelect.value : null;
        currentFilters.themes = Array.from(themeCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Обновляем UI активных фильтров
        updateActiveFiltersUI();

        // Применяем фильтры к карточкам
        cards.forEach(card => {
            const cardRegion = card.dataset.region;
            const cardPrice = parseInt(card.dataset.price);
            const cardTags = card.dataset.tags.toLowerCase().split(',').map(tag => tag.trim());

            let isVisible = true;

            // Фильтр по региону
            if (currentFilters.region && cardRegion !== currentFilters.region) {
                isVisible = false;
            }

            // Фильтр по цене
            if (currentFilters.price && isVisible) {
                if (currentFilters.price === 'low' && cardPrice > 50000) isVisible = false;
                if (currentFilters.price === 'mid' && (cardPrice < 50000 || cardPrice > 150000)) isVisible = false;
                if (currentFilters.price === 'high' && cardPrice < 150000) isVisible = false;
            }

            // Фильтр по темам
            if (currentFilters.themes.length > 0 && isVisible) {
                const hasMatchingTheme = currentFilters.themes.some(theme =>
                    cardTags.includes(theme.toLowerCase())
                );
                if (!hasMatchingTheme) isVisible = false;
            }

            // Показываем/скрываем карточку
            card.style.display = isVisible ? '' : 'none';
        });

        // Обновляем видимость групп
        updateGroupsVisibility();

        // Проверка наличия видимых карточек
        const hasVisibleCards = Array.from(cards).some(card => card.style.display !== 'none');
        emptyMessage.hidden = hasVisibleCards;
    }

    // Функция обновления видимости групп
    function updateGroupsVisibility() {
        groups.forEach(group => {
            const visibleCards = group.querySelectorAll('.destination-card:not([style*="display: none"])');
            group.style.display = visibleCards.length > 0 ? '' : 'none';
        });
    }

    // Функция сброса всех фильтров
    function resetAllFilters() {
        regionSelect.selectedIndex = 0;
        priceSelect.selectedIndex = 0;
        themeCheckboxes.forEach(cb => (cb.checked = false));

        currentFilters.region = null;
        currentFilters.price = null;
        currentFilters.themes = [];

        updateActiveFiltersUI();

        // Показываем все карточки
        cards.forEach(card => (card.style.display = ''));
        groups.forEach(group => (group.style.display = ''));

        emptyMessage.hidden = true;
    }

    // Обработчик клика по кнопке "Применить"
    applyBtn.addEventListener('click', applyFilters);

    // Обработчик клика по кнопке "Очистить"
    clearBtn.addEventListener('click', resetAllFilters);

    // Обработчик удаления отдельного фильтра
    container.addEventListener('click', e => {
        const removeBtn = e.target.closest('.filters__tag-remove');
        if (!removeBtn) return;

        const tag = removeBtn.closest('.filters__tag');
        const tagType = tag.dataset.tagType;
        const tagValue = tag.dataset.tagValue;

        // Удаляем фильтр из currentFilters
        switch (tagType) {
            case 'region':
                currentFilters.region = null;
                regionSelect.selectedIndex = 0;
                break;
            case 'price':
                currentFilters.price = null;
                priceSelect.selectedIndex = 0;
                break;
            case 'theme':
                currentFilters.themes = currentFilters.themes.filter(t => t !== tagValue);
                const correspondingCheckbox = Array.from(themeCheckboxes).find(cb => cb.value === tagValue);
                if (correspondingCheckbox) correspondingCheckbox.checked = false;
                break;
        }

        // Обновляем UI и применяем фильтры
        updateActiveFiltersUI();

        // Если это был последний фильтр - показываем все карточки
        if (!currentFilters.region && !currentFilters.price && currentFilters.themes.length === 0) {
            resetAllFilters();
        } else {
            applyFilters();
        }
    });
}