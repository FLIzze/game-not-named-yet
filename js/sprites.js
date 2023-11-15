class Sprite {
    // public dialogue: string = "";
    constructor(position, imgSrc = "/img/", canvas) {
        this.position = position;
        this.imgSrc = imgSrc;
        this.frameCount = 0;
        this.position.x = position.x;
        this.position.y = position.y;
        this.imgSrc = imgSrc;
        this.height = 16 * 4.5;
        this.width = 16 * 4.5;
        document.body.appendChild(canvas);
    }
    draw(c) {
        const img = new Image();
        img.src = this.imgSrc;
        let position = { x: this.position.x, y: this.position.y };
        let height = this.height;
        let width = this.width;
        img.onload = function () {
            c.drawImage(img, position.x, position.y, width, height);
        };
    }
}
export default Sprite;
