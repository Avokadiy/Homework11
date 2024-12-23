const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});

let users = [];

wss.on('connection', (ws) => {
    console.log('Новое соединение установлено.') // Перенести уведомление на видимое для пользователя
    
    ws.on('message', (message) => {
        console.log(`'Получено сообщение:', ${message}`); // Перенести уведомление на видимое для пользователя
        ws.send(`Эхо: ${message}`); // Перенести уведомление на видимое для пользователя
    })
    
    ws.send('Добро пожаловать на WebSocket сервер!');
    
    ws.on('close', () => {
        users.splice(users.indexOf(ws), 1);
        console.log('Пользователь вышел из чата')
    })

    ws.on('error', (error) => {
        console.log(error);
    })
})

console.log('WebSocket сервер запущен на localhost:8080.');