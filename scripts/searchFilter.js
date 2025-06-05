export function setupSearchFilter() {
    const searchInput = document.querySelector('.filters__search-input');
    const cards = document.querySelectorAll('[data-card]');
    const groups = document.querySelectorAll('.destinations__group');
    const emptyMessage = document.querySelector('[data-empty-message]');

    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const region = card.dataset.region.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();

            const matches =
                title.includes(query) ||
                region.includes(query) ||
                tags.includes(query);

            card.style.display = matches ? '' : 'none';
            if (matches) visibleCount++;
        });

        // Обновим видимость групп
        groups.forEach(group => {
            const visibleCards = group.querySelectorAll('[data-card]:not([style*="display: none"])');
            group.style.display = visibleCards.length > 0 ? '' : 'none';
        });

        // Показываем сообщение если ничего не найдено
        if (emptyMessage) {
            emptyMessage.hidden = visibleCount > 0;
        }
    });
}
