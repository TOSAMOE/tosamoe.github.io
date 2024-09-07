from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Пример простого маршрута для обновления баланса
@app.route('/update_balance', methods=['POST'])
def update_balance():
    data = request.json
    balance = data.get('balance', 0)

    # Здесь можно добавить логику для отправки обновленного баланса в Telegram бот
    # Например, отправка через Telegram API
    telegram_api_url = f'https://api.telegram.org/bot<TOKEN>/sendMessage'
    chat_id = "<CHAT_ID>"  # ID пользователя или группы
    message = f'Ваш новый баланс: {balance}'

    requests.post(telegram_api_url, json={
        'chat_id': chat_id,
        'text': message
    })

    return jsonify({'status': 'ok', 'balance': balance})

if __name__ == '__main__':
    app.run(debug=True)
