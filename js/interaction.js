class Interaction {
    constructor(positionX = 0, positionY = 0) {
        this.position = { x: positionX, y: positionY };
        this.height = 16 * 4.5;
        this.width = 16 * 4.5;
    }
    draw(c, imgSrc) {
        c.fillStyle = 'white';
        // c!.fillRect(this.position.x, this.position.y, this.width, this.height);
        const img = new Image();
        img.src = imgSrc;
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
