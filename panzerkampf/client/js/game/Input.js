/**
 * This class facilitates the tracking of user input, such as mouse clicks
 * and button presses.
 */
class Input {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.mouseDown = false;
        this.mouseCoords = [0, 0];
    }

    static create(keyElement, mouseMoveElement) {
        const input = new Input();
        input.applyEventHandlers(keyElement, keyElement, mouseMoveElement);
        return input;
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 65: // a
                this.left = true;
                break;
            case 87: // w
                this.up = true;
                break;
            case 68: // d
                this.right = true;
                break;
            case 83: // s
                this.down = true;
            default:
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case 65: // a
                this.left = false;
                break;
            case 87: // w
                this.up = false;
                break;
            case 68: // d
                this.right = false;
                break;
            case 83: // s
                this.down = false;
            default:
                break;
        }
    }

    onMouseDown(event) {
        if (event.which === 1) this.mouseDown = true;
    }

    onMouseUp(event) {
        if (event.which === 1) this.mouseDown = false;
    }

    onMouseMove(event) {
        this.mouseCoords = [event.offsetX, event.offsetY];
    }

    applyEventHandlers(keyElement, mouseClickElement, mouseMoveElement) {
        keyElement.addEventListener('keydown', this.onKeyDown.bind(this));
        keyElement.addEventListener('keyup', this.onKeyUp.bind(this));
        mouseClickElement.addEventListener('mousedown', this.onMouseDown.bind(this));
        mouseClickElement.addEventListener('mouseup', this.onMouseUp.bind(this));
        mouseMoveElement.setAttribute('tabindex', 1);
        mouseMoveElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
}

module.exports = Input;