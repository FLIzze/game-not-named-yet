import Sprite from "./sprite.js";
class Player extends Sprite {
    constructor(canvas) {
        super({ x: canvas.width / 2, y: canvas.height / 2 }, "../img/animation-new-player.png", canvas);
        this.frame = { x: 0, y: 0 };
    }
    draw(c) {
        const img = new Image();
        img.src = this.imgSrc;
        let x = this.position.x;
        let y = this.position.y;
        if (this.frameCount == 50) {
            this.frame.x += 16;
            this.frameCount = 0;
        }
        let frame = { x: this.frame.x, y: this.frame.y };
        img.onload = function () {
            // arguments: img, frame.x where start the image in x axis, same for frame.y, widht, height, x, y: position in canvas, ??
            c.drawImage(img, frame.x, 0, 16, 32, x, y, 16 * 4.5, 32 * 4.5);
            // c!.drawImage(img, x, y, 16*4.5, 32*4.5);
        };
        if (this.frame.x >= 64) {
            this.frame.x = 0;
        }
        this.frameCount++;
    }
}
export default Player;
