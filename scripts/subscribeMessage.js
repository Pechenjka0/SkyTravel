export function setupSubscribeForm() {
    const form = document.querySelector('[data-subscribe-form]');
    if (!form) {
        console.error('Форма подписки не найдена');
        return;
    }

    const message = document.querySelector('[data-subscribe-message]');
    if (!message) {
        console.error('Элемент сообщения не найден');
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Показать сообщение с анимацией
        showMessage(message);

        // Сброс формы
        form.reset();
    });
}

function showMessage(element) {
    element.style.display = 'block';
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.3s ease';

    // Анимация появления
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);

    // Автоскрытие через 3 секунды
    setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }, 3000);
}