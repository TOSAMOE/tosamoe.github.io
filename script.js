function openSupportModal() {
    document.getElementById("supportModal").style.display = "flex";
}

function closeSupportModal() {
    document.getElementById("supportModal").style.display = "none";
}

async function sendMessageToChatGPT(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value || "Анонимно";
    const email = document.getElementById("userEmail").value;
    const message = document.getElementById("userMessage").value;

    const data = {
        prompt: `${name} спрашивает: ${message}`,
        max_tokens: 100,
        model: "text-davinci-003" // Укажите нужную модель ChatGPT
    };

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("responseArea").innerText = `Ответ: ${result.choices[0].text}`;
    } catch (error) {
        document.getElementById("responseArea").innerText = "Ошибка при отправке сообщения. Попробуйте снова.";
    }
}
