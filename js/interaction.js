class Interaction {
    constructor(positionX = 0, positionY = 0, name, imgSrc) {
        this.isUsed = false;
        this.frameCount = 0;
        this.position = { x: positionX, y: positionY };
        this.height = 16 * 4.5;
        this.width = 16 * 4.5;
        this.name = name;
        this.imgSrc = imgSrc;
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
Interaction.width = 16 * 4.5;
Interaction.height = 16 * 4.5;
export default Interaction;
