const Util=require('./Util');
const Vector=require('./Vector');

class Entity {
    constructor(position, velocity, acceleration, hitboxSize) {
        this.position=position||Vector.zero();
    }

}