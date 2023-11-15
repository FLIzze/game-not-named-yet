class Interaction {
    public position;
    public width: number;
    public height: number;
    static width = 16*4.5;
    static height = 16*4.5;
    
    constructor(positionX = 0, positionY = 0) {
        this.position = {x: positionX, y: positionY}
        this.height = 16 * 4.5;
        this.width = 16 * 4.5;
    }
    
    draw(c: CanvasRenderingContext2D, imgSrc: string) {
        c!.fillStyle = 'white'
        // c!.fillRect(this.position.x, this.position.y, this.width, this.height);
        const img = new Image();
        img.src = imgSrc;
        let position = {x: this.position.x, y: this.position.y}
        let height = this.height;
        let width = this.width;
        img.onload = function() {
            c!.drawImage(img, position.x, position.y, width, height)
        }
    }
}

export default Interaction;