class Sprite {
    public position;
    public width: number;
    public height: number;

    constructor(public imgSrc: string, canvas: HTMLCanvasElement) {
        this.position = {x: canvas.width/2,y: canvas.height/2};
        this.imgSrc = imgSrc;
        this.height = 20*4.5*1.5;
        this.width = 13*4.5*1.5;
        document.body.appendChild(canvas);
    }

    draw(c: CanvasRenderingContext2D | null) {
        const img = new Image();
        img.src = this.imgSrc;
        let position = {x: this.position.x, y: this.position.y}
        img.onload = function() {
            c!.drawImage(img, position.x, position.y)
        }
    }
}

export default Sprite;