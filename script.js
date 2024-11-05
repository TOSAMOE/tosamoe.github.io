function openSupportModal() {
    document.getElementById("supportModal").style.display = "flex";
}

function closeSupportModal() {
    document.getElementById("supportModal").style.display = "none";
}

async function sendMessageToSupport(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value || "Анонимно";
    const email = document.getElementById("userEmail").value;
    const message = document.getElementById("userMessage").value;

    const data = {
        name: name,
        email: email,
        message: message
    };

    // Отправляем данные на сервер
    const response = await fetch("https://your-server-url/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Сообщение отправлено! Ожидайте ответа.");
        closeSupportModal();
    } else {
        alert("Ошибка при отправке сообщения. Пожалуйста, попробуйте снова.");
    }
}
