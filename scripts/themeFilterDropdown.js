export function setupThemeDropdown() {
    document.addEventListener('click', (e) => {
        const select = e.target.closest('[data-filter="theme"]');

        document.querySelectorAll('[data-filter="theme"]').forEach(el => {
            const dropdown = el.querySelector('[data-filter-dropdown]');

            if (el === select) {
                const isOpen = !dropdown.hasAttribute('hidden');
                el.querySelector('[data-filter-trigger]').setAttribute('aria-expanded', String(!isOpen));
                dropdown.toggleAttribute('hidden');
            } else {
                el.querySelector('[data-filter-trigger]').setAttribute('aria-expanded', 'false');
                dropdown.setAttribute('hidden', true);
            }
        });
    });
}