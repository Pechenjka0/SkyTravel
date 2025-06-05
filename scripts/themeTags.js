export function setupActiveThemeTags() {
    const container = document.querySelector('[data-filters-inner]');
    if (!container) return;

    const wrapper = container.querySelector('[data-active-wrapper]');
    const tagsContainer = container.querySelector('[data-active-filters]');
    const clearButton = container.querySelector('[data-filters-clear]');
    const checkboxes = container.querySelectorAll('[data-filter-option]');

    function updateVisibility() {
        const hasTags = tagsContainer.children.length > 0;
        wrapper.hidden = !hasTags;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const value = checkbox.value;
            const existing = tagsContainer.querySelector(`[data-tag-value="${value}"]`);

            if (checkbox.checked && !existing) {
                const span = document.createElement('span');
                span.className = 'filters__tag';
                span.setAttribute('data-tag-value', value);
                span.innerHTML = `
          ${value.charAt(0).toUpperCase() + value.slice(1)}
          <button class="filters__tag-remove" aria-label="Удалить фильтр">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.17938 10.3901L5.99938 7.20511L2.81938 10.3901L2.10938 9.68011L5.29438 6.50011L2.10938 3.32011L2.81938 2.61011L5.99938 5.79511L9.17938 2.61511L9.88438 3.32011L6.70438 6.50011L9.88438 9.68011L9.17938 10.3901Z" />
            </svg>
          </button>`;
                tagsContainer.appendChild(span);

                span.querySelector('button').addEventListener('click', () => {
                    checkbox.checked = false;
                    span.remove();
                    updateVisibility();
                });
            }

            if (!checkbox.checked && existing) {
                existing.remove();
            }

            updateVisibility();
        });
    });

    clearButton.addEventListener('click', () => {
        checkboxes.forEach(c => {
            c.checked = false;
        });
        tagsContainer.innerHTML = '';
        updateVisibility();
    });

    updateVisibility(); // при загрузке
}