export function setupContactFormMessage() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) {
        
        return;
    }

    const message = document.querySelector('[data-contact-message]');
    if (!message) {
       
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        showMessage(message);
        form.reset();
    });
}

function showMessage(element) {
    element.style.display = 'block';
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.3s ease';

    // Плавное появление
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);

    // Исчезновение через 3 секунды
    setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }, 3000);
}
