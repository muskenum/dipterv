/**
 * Stores the state of the player on the server. This class will also store
 * other important information such as socket ID, packet number, and latency.
 */

const Shell = require('./Shell');
const constants = require('../lib/constants');
const Entity = require('../lib/Entity');
const util = require('../lib/util');
const Vector = require('../lib/Vector');

class Player extends Entity {
    constructor(name, socketID) {
        super();
        this.name = name;
        this.socketID = socketID;
        this.lastUpdateTime = 0;
        this.tankAngle = 0;
        this.turretAngle = 0;
        this.turnRate = 0;
        this.speed = constants.PLAYER_DEFAULT_SPEED;
        this.shotCooldown = constants.PLAYER_SHOT_COOLDOWN;
        this.lastShotTime = 0;
        this.health = constants.PLAYER_MAX_HEALTH;
        this.hitboxSize = constants.PLAYER_DEFAULT_HITBOX_SIZE;
        this.kills = 0;
        this.deaths = 0;
    }

    static create(name, socketID) {
        const player = new Player(name, socketID);
        player.spawn();
        return player;
    }

    updateOnInput(data) {
        if (data.up) this.velocity = Vector.fromPolar(this.speed, this.tankAngle);
        else if (data.down) this.velocity = Vector.fromPolar(this.speed * -1, this.tankAngle);
        else if (!(data.up ^ data.down)) this.velocity = Vector.zero();

        if (data.right) this.turnRate = constants.PLAYER_TURN_RATE;
        else if (data.left) this.turnRate = constants.PLAYER_TURN_RATE * -1;
        else if (!(data.right ^ data.left)) this.turnRate = 0;

        this.turretAngle = data.turretAngle;
    }

    update(lastUpdateTime, deltaTime) {
        this.lastUpdateTime = lastUpdateTime;
        this.position.add(Vector.scale(this.velocity, deltaTime));
        this.boundToWorld();
        this.tankAngle = util.normalizeAngle(this.tankAngle + this.turnRate * deltaTime);
    }

    getProjectilesFromShot() {
        const shells = [Shell.createFromPlayer(this)];
        this.lastShotTime = this.lastUpdateTime;
        return shells;
    }

    isDead() {
        return this.health <= 0
    }

    damage(amount) {
        this.health -= amount;
    }

    spawn() {
        this.position = new Vector(util.randRange(constants.WORLD_MIN + constants.WORLD_PADDING, constants.WORLD_MAX - constants.WORLD_PADDING),
            util.randRange(constants.WORLD_MIN + constants.WORLD_PADDING, constants.WORLD_MAX - constants.WORLD_PADDING));
        this.angle = util.randRange((0, 2 * Math.PI));
        this.health = constants.PLAYER_MAX_HEALTH;
    }
}

module.exports = Player;