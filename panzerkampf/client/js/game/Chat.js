/**
 * This class handles the sending and receiving of chat messages as well as
 * their display. Chat messages will use the same socket as the game.
 */

class Chat {
    constructor(socket, displayElementID, inputElementID) {
        this.socket = socket;
        this.displayElement = displayElementID;
        this.inputElement = inputElementID;
    }

    static create(socket, displayElementID, inputElementID) {
        const displayElement = document.getElementById(displayElementID);
        const inputElement = document.getElementById(inputElementID);
        const chat = new Chat(socket, displayElementID, inputElementID);
        chat.init();
        return chat;
    }

    init() {
        this.inputElement.addEventListener('keydown', this.onInputKeyDown.bind(this));
        this.socket.on('chat-server-to-client', this.onChatReceive.bind(this));
    }

    onInputKeyDown(event) {
        if (event.keyCode === 13) {
            const text = this.inputElement.value;
            this.inputElement.value = '';
            this.socket.emit('chat-client-to-server', text);
        }
    }

    onChatReceive(data) {
        const element = document.createElement('li');
        if (data.isNotification) element.setAttribute('class', 'notification');
        element.appendChild(document.createTextNode(`${data.name}: ${data.message}`));
        this.displayElement.appendChild(element);
    }
}

module.exports = Chat;