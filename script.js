const socket = new WebSocket('ws:localhost:8080');

socket.addEventListener('open', (event) => {
    console.log('Соединение установлено'); // Нужно по ТЗ
})

socket.addEventListener('message', (event) => {
    const messagiesDiv = document.querySelector('.chat');
    messagiesDiv.innerHTML += `<p class='myMessage'>${event.data}</p>`
    document.querySelector(".chat").scrollTop = document.querySelector(".chat").scrollHeight;
})

const sendButton = document.querySelector('.messages_send');
sendButton.addEventListener('click', sendMessage)

function sendMessage() {
    const messageInput = document.querySelector('.messages_input');
    const message = messageInput.value;
    socket.send(message);
    messageInput.value = '';
}

document.querySelector(".messages_input").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.querySelector(".messages_send").click();
        }
    });

