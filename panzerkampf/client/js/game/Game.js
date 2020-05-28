/**
 * Class encapsulating the client side of the game, handles drawing and
 * updates.
 */
const Drawing = require('./Drawing');
const Input = require('./Input');
const Viewport = require('./Viewport');

const constants = require('../../../lib/constants');
const Vector = require('../../../lib/Vector');
const util = require('../../../lib/util');

class Game {
    constructor(socket, viewport, drawing, input) {
        this.socket = socket;
        this.viewport = viewport;
        this.drawing = drawing;
        this.input = input;
        this.self = null;
        this.players = [];
        this.projectiles = [];
        this.animationFrameId = null;
        this.lastUpdateTime = 0;
        this.deltaTime = 0;
    }

    static create(socket, canvasElementID) {
        const canvas = document.getElementById(canvasElementID);
        canvas.width = constants.CANVAS_WIDTH;
        canvas.height = constants.CANVAS_HEIGHT;
        const viewport = Viewport.create(canvas);
        const drawing = Drawing.create(canvas, viewport);
        const input = Input.create(document, canvas);

        const game = new Game(socket, viewport, drawing, input);
        game.init();
        return game;
    }

    init() {
        this.lastUpdateTime = Date.now();
        this.socket.on('update', this.onReceiveGameState.bind(this));
    }

    onReceiveGameState(state) {
        this.self = state.self;
        this.players = state.players;
        this.projectiles = state.projectiles;
        //this.viewport.updateTrackingPosition(state.self);
    }

    run() {
        const currentTime = Date.now();
        this.deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;
        this.update();
        this.draw();
        this.animationFrameId = window.requestAnimationFrame(this.run.bind(this));
    }

    stop() {
        window.cancelAnimationFrame(this.animationFrameId);
    }

    update() {
        if (this.self) {
            //this.viewport.update(this.deltaTime);
            const absoluteMosueCoords = this.viewport.toWorld(Vector.fromArray(this.input.mouseCoords));
            const playerToMouseVector = Vector.sub(this.self.position, absoluteMosueCoords);
            this.socket.emit('player-action', {
                up: this.input.up,
                down: this.input.down,
                left: this.input.left,
                right: this.input.right,
                shoot: this.input.mouseDown,
                turretAngle: util.normalizeAngle(playerToMouseVector.angle + Math.PI)
            });
        }
    }

    draw() {
        if (this.self) {
            this.drawing.clear();
            this.drawing.drawTiles();
            this.projectiles.forEach(this.drawing.drawShell.bind(this.drawing));
            this.drawing.drawTank(true, this.self);
            this.players.forEach(tank => this.drawing.drawTank(false, tank));
        }
    }
}

module.exports = Game;