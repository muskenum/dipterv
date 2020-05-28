/**
 * This class stores the state of a shell on the server.
 */
const constants = require('../lib/constants');
const Entity = require('../lib/Entity');
const Vector = require('../lib/Vector');

class Shell extends Entity {
    constructor(position, velocity, angle, source) {
        super(position, velocity, Vector.zero(), constants.SHELL_HITBOX_SIZE);
        this.angle = angle;
        this.source = source;
        this.damage = constants.SHELL_DEFAULT_DAMAGE;
        this.distanceTraveled = 0;
        this.destroyed = false;
    }

    static createFromPlayer(player, angleDeviation = 0) {
        const angle = player.turretAngle + angleDeviation;
        return new Shell(player.position.copy(), Vector.fromPolar(constants.SHELL_SPEED, angle), angle, player);
    }

    update(lastUpdateTime, deltaTime) {
        const distanceStep = Vector.scale(this.velocity, deltaTime);
        this.position.add(distanceStep);
        this.distanceTraveled += distanceStep.mag2;
        if (!this.inWorld()) this.destroyed = true;
    }
}

module.exports = Shell;