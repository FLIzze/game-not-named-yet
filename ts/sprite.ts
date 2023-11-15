import Dialogue from "./dialogue.js";

class Sprite {
    public width: number;
    public height: number;
    public frameCount: number = 0;
    // public dialogue: string = "";

    constructor(public position: {x: number, y: number}, public imgSrc: string = "/img/", canvas: HTMLCanvasElement) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.imgSrc = imgSrc;
        this.height = 16*4.5;
        this.width = 16*4.5;

        document.body.appendChild(canvas);
    }
    
    draw(c: CanvasRenderingContext2D | null) {
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


export default Sprite;