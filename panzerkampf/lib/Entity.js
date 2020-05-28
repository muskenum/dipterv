/**
 * Wrapper class for all entities that need basic physics.
 */
const constants = require('./constants');
const util = require('./util');
const Vector = require('./Vector');

class Entity {
    constructor(position, velocity, acceleration, hitboxSize) {
        this.position = position || Vector.zero();
        this.velocity = velocity || Vector.zero();
        this.acceleration = acceleration || Vector.zero();
        this.hitboxSize = hitboxSize;
    }

    collided(other) {
        const minDistance = this.hitboxSize + other.hitboxSize;
        return Vector.sub(this.position, other.position).mag2 <= minDistance * minDistance;
    }

    /**
     * Returns true if this Entity is inside the bounds of the game environment
     * world.
     */
    inWorld() {
        return util.inBound(this.x, constants.WORLD_MIN, constants.WORLD_MAX) && util.inBound(this.y, constants.WORLD_MIN, constants.WORLD_MAX);
    }

    /**
     * Bounds this Entity's position within the game world if it is outside of the
     * game world.
     */
    boundToWorld() {
        this.position.x = util.bound(this.position.x, constants.WORLD_MIN, constants.WORLD_MAX);
        this.position.y = util.bound(this.position.y, constants.WORLD_MIN, constants.WORLD_MAX);
    }
}

module.exports = Entity;