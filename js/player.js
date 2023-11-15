import Sprite from "./sprite.js";
class Player extends Sprite {
    constructor(canvas) {
        super({ x: canvas.width / 2, y: canvas.height / 2 }, "../img/player/player.png", canvas);
        this.sprint = 0;
        this.frame = { x: 11, y: 22 };
    }
    draw(c) {
        const img = new Image();
        img.src = this.imgSrc;
        let x = this.position.x;
        let y = this.position.y;
        if (this.frameCount == 25) {
            this.frame.x += 48;
            this.frameCount = 0;
        }
        let frame = { x: this.frame.x, y: this.frame.y };
        img.onload = function () {
            c.drawImage(img, frame.x, frame.y, 24, 42, x, y, 13 * 4.5 * 1.7, 20 * 4.5 * 1.7);
        };
        if (this.frame.x >= 285) {
            this.frame.x = 11;
        }
        this.frameCount++;
    }
}
export default Player;
