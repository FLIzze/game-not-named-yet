class Interaction {
    public position;
    public width: number;
    public height: number;
    public isUsed: boolean = false;
    public frameCount: number = 0;
    public name: string;
    static width = 16*4.5;
    static height = 16*4.5;
    public imgSrc: string;
    
    constructor(positionX = 0, positionY = 0, name: string, imgSrc: string) {
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
        img.onload = function() {
            c!.drawImage(img, position.x, position.y, width, height)
        }
    }
}

export default Interaction;