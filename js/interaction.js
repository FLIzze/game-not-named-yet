class Interaction {
    constructor(positionX = 0, positionY = 0, name, imgSrc, nmbFrames = 1, spriteSize = 16) {
        this.nmbFrames = nmbFrames;
        this.spriteSize = spriteSize;
        this.isUsed = false;
        this.frameCount = 0;
        this.frame = 0;
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
        console.log(this.frameCount);
        if (this.isUsed && this.frameCount == 10 && this.frame < this.spriteSize * (this.nmbFrames - 1)) {
            this.frame += 16;
            this.frameCount = 0;
        }
        let frame = this.frame;
        let spriteSize = this.spriteSize;
        img.onload = function () {
            c.drawImage(img, frame, 0, spriteSize, spriteSize, position.x, position.y, width, height);
        };
        if (this.isUsed) {
            this.frameCount++;
        }
    }
}
Interaction.width = 16 * 4.5;
Interaction.height = 16 * 4.5;
export default Interaction;
