const socket = io();

let movement = {
    up: false,
    down: false,
    left: false,
    right: false
};

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'w':
            movement.up = true;
            break;
        case 'a':
            movement.left = true;
            break;
        case 's':
            movement.down = true;
            break;
        case 'd':
            movement.right = true;
            break;
    }
});
document.addEventListener('keyup', event => {
    switch (event.key) {
        case 'w':
            movement.up = false;
            break;
        case 'a':
            movement.left = false;
            break;
        case 's':
            movement.down = false;
            break;
        case 'd':
            movement.right = false;
            break;
    }
});

socket.emit('new player');
setInterval(() => {
    socket.emit('movement', movement);
}, 1000 / 60);

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let context = canvas.getContext('2d');
socket.on('state', players => {
    console.log(players);
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    for (let id in players) {
        let player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
});