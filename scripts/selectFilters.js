export function setupSelectFilters() {
    const container = document.querySelector('[data-filters-inner]');
    const tagsContainer = container.querySelector('[data-active-filters]');
    const clearButton = container.querySelector('[data-filters-clear]');
    const activeWrapper = container.querySelector('[data-active-wrapper]');

    const selects = [
        { selector: '[data-filter-region]', label: 'region' },
        { selector: '[data-filter-price]', label: 'price' }
    ];

    selects.forEach(({ selector }) => {
        const select = container.querySelector(selector);

        select.addEventListener('change', () => {
            const value = select.value;
            const label = select.options[select.selectedIndex].textContent;
            const key = select.name;

            // Удаляем старый, если уже был
            const existing = tagsContainer.querySelector(`[data-tag-key="${key}"]`);
            if (existing) existing.remove();

            // Добавляем новый
            const tag = document.createElement('span');
            tag.className = 'filters__tag';
            tag.setAttribute('data-tag-key', key);
            tag.innerHTML = `
        ${label}
        <button class="filters__tag-remove" aria-label="Удалить фильтр">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.179 10.39 6 7.205 2.82 10.39 2.11 9.68 5.29 6.5 2.11 3.32 2.82 2.61 6 5.795 9.179 2.615 9.884 3.32 6.704 6.5 9.884 9.68 9.179 10.39Z"/>
          </svg>
        </button>
      `;
            tagsContainer.appendChild(tag);
            activeWrapper.hidden = false;

            // При удалении
            tag.querySelector('button').addEventListener('click', () => {
                tag.remove();
                select.selectedIndex = 0;
                if (!tagsContainer.children.length) activeWrapper.hidden = true;
            });
        });
    });

    // Очистка всех
    clearButton.addEventListener('click', () => {
        tagsContainer.innerHTML = '';
        activeWrapper.hidden = true;
        selects.forEach(({ selector }) => {
            const select = container.querySelector(selector);
            select.selectedIndex = 0;
        });
    });
}