class Interaction {
    public position;
    public width: number;
    public height: number;
    public isUsed: boolean = false;
    public frameCount: number = 0;
    public frame: number = 0;
    public name: string;
    static width = 16*4.5;
    static height = 16*4.5;
    public imgSrc: string;
    
    constructor(positionX = 0, positionY = 0, name: string, imgSrc: string, public nmbFrames: number = 1, public spriteSize: number = 16, public infiniteAnimation: number = 0) {
        this.position = {x: positionX, y: positionY}
        this.height = 16 * 4.5;
        this.width = 16 * 4.5;
        this.name = name;
        this.imgSrc = imgSrc;
    }
    
    draw(c: CanvasRenderingContext2D) {
        const img = new Image();
        img.src = this.imgSrc;
        let position = {x: this.position.x, y: this.position.y}
        let height = this.height;
        let width = this.width;
        if (this.isUsed && this.frameCount == 10 && this.frame < this.spriteSize*(this.nmbFrames-1)) {
            this.frame += 16;
            this.frameCount = 0;
        }
        let frame = this.frame;
        let spriteSize = this.spriteSize;
        img.onload = function() {
            c!.drawImage(img, frame, 0, spriteSize, spriteSize, position.x, position.y, width, height)
        }
        if (this.isUsed && this.frame < this.spriteSize*(this.nmbFrames-1)) {
            this.frameCount++;
        }
    }
}

export default Interaction;