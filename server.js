const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});

let users = [];

wss.on('connection', (ws) => {
    users.push(ws);
    ws.send('Новое соединение установлено.')
    
    ws.on('message', (message) => {
        users.forEach(otherUserWs => {
            otherUserWs.send(`${message}`);
        })
    })
    
    ws.send('Добро пожаловать на WebSocket сервер!');
    
    ws.on('close', () => {
        users.splice(users.indexOf(ws), 1);
        ws.send('Пользователь вышел из чата');
    })

    ws.on('error', (error) => {
        console.log(error);
    })
})

console.log('WebSocket сервер запущен на localhost:8080.');