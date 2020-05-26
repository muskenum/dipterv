/**
 * Game class on the server to manage the state of existing players
 * and entities.
 */

const Shell = require('./Shell');
const Player = require('./Player');

class Game {
    constructor() {
        this.clients = new Map(); // mapping the connected socket ids and socket instances
        this.players = new Map(); // mapping the connected socket ids and players
        this.projectiles = [];
        this.lastUpdateTime = 0;
        this.deltaTime = 0;
    }

    static create() { // creates a new Game object
        const game = new Game();
        game.lastUpdateTime = Date.now();
        return game;
    }

    addNewPlayer(name, socket) {
        this.clients.set(socket.id, socket);
        this.players.set(socket.id, Player.create(name, socket.id));
    }

    removePlayer(socketID) {
        if (this.clients.has(socketID)) this.clients.delete(socketID);
        if (this.players.has(socketID)) {
            let player = this.players.get(socketID);
            this.players.delete(socketID);
            return player.name;
        }
    }

    getPlayerNameBySocketId(socketID) {
        if (this.players.has(socketID)) return this.players.get(socketID).name;
    }

    updatePlayerOnInput(socketID, data) {
        let player = this.players.get(socketID);
        if (player) {
            player.updateOnInput(data);
            if (data.shoot) {
                let projectiles = player.getProjectilesFromShot();
                this.projectiles.push(...projectiles);
            }
        }
    }

    update() {
        let currentTime = Date.now();
        this.deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;
        const entities = [
            ...this.players.values(),
            ...this.projectiles
        ];
        entities.forEach(entity => {
            entity.update(this.lastUpdateTime, this.deltaTime)
        });
        for (let i = 0; i < entities.length; i++) {
            for (let j = i + 1; j < entities.length; j++) {
                let e1 = entities[i];
                let e2 = entities[j];
                if (!e1.collided(e2)) continue;
                if (e1 instanceof Shell && e2 instanceof Player) {
                    e1 = entities[j];
                    e2 = entities[i];
                }
                if (e1 instanceof Player && e2 instanceof Shell && e2.source !== e1) {
                    e1.damage(e2.damage);
                    if (e1.isDead()) {
                        e1.spawn();
                        e1.deaths++;
                        e2.source.kills++;
                    }
                    e2.destroyed = true;
                }
            }
        }
    }

    sendState() {
        let players = [...this.players.values()];
        this.clients.forEach((client, socketID) => {
            let currentPlayer = this.players.get(socketID);
            this.clients.get(socketID).emit('update', {
                self: currentPlayer,
                players: players,
                projectiles: this.projectiles
            });
        });
    }
}

module.exports = Game;

