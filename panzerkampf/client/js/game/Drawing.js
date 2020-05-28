/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 */
const constants = require('../../../lib/constants');
const util = require('../../../lib/util');

class Drawing {
    constructor(context, images, viewport) {
        this.context = context;
        this.images = images;
        this.viewport = viewport;
        this.width = context.canvas.width;
        this.height = context.canvas.height;
    }

    static create(canvas, viewport) {
        const context = canvas.getContext('2d');
        const images = {};
        for (const key of constants.DRAWING_IMG_KEYS) {
            images[key] = new Image();
            images[key].src = `${constants.DRAWING_IMG_BASE_PATH}/${key}.png`;
        }
        return new Drawing(context, images, viewport);
    }

    static translateAngle(angle) {
        return util.normalizeAngle(angle + Math.PI / 2);
    }

    drawCenteredImage(image) {
        this.context.drawImage(image, -image.width / 2, -image.height / 2);
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawTank(isSelf, player) {
        this.context.save();
        const canvasCoords = this.viewport.toCanvas(player.position);
        this.context.translate(canvasCoords.x, canvasCoords.y);
        this.context.textAlign = 'center';
        this.context.font = constants.DRAWING_NAME_FONT;
        this.context.fillStyle = constants.DRAWING_NAME_COLOR;
        this.context.fillText(player.name, 0, -50);

        for (let i = 0; i < 10; i++) {
            if (i < player.health) this.context.fillStyle = constants.DRAWING_HP_COLOR;
            else this.context.fillStyle = constants.DRAWING_HP_MISSING_COLOR;
            this.context.fillRect(-25 + 5 * i, -40, 5, 4);
        }
        this.context.rotate(Drawing.translateAngle(player.tankAngle));
        this.drawCenteredImage(this.images[isSelf ? 'self_tank' : 'other_tank']);
        this.context.rotate(Drawing.translateAngle(player.turretAngle));
        this.drawCenteredImage(this.images[isSelf ? 'self_turret' : 'other_turret']);
        this.context.restore();
    }

    drawShell(shell) {
        this.context.save();
        const canvasCoords = this.viewport.toCanvas(shell.position);
        this.context.translate(canvasCoords.x, canvasCoords.y);
        this.context.rotate(Drawing.translateAngle(shell.angle));
        this.drawCenteredImage(this.images['shell']);
        this.context.restore();
    }

    drawTiles() {
        const start = this.viewport.toCanvas({x: constants.WORLD_MIN, y: constants.WORLD_MIN});
        const end = this.viewport.toCanvas({x: constants.WORLD_MAX, y: constants.WORLD_MAX});
        for (let x = start.x; x < end.x; x += constants.DRAWING_TILE_SIZE) {
            for (let y = start.y; y < end.y; y += constants.DRAWING_TILE_SIZE) {
                this.context.drawImage(this.images['tile'], x, y);
            }
        }
    }
}

module.exports = Drawing;