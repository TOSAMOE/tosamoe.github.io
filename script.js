const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage("Вы", userMessage);
    userInput.value = '';

    // Замените на свою логику или подключение к API
    setTimeout(() => {
        let botReply = generateBotReply(userMessage);
        appendMessage("Бот", botReply);
    }, 500);
}

function appendMessage(sender, text) {
    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function generateBotReply(message) {
    // Здесь можно добавить обработку на основе ключевых слов или базовую логику
    return "Это тестовый ответ.";
}
