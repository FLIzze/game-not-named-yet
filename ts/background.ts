class Background {
    public position;
    public imgSrc: string;
    
    constructor(public offset: {x: number, y: number}, canvas: HTMLCanvasElement) {
        this.position = {x: offset.x, y: offset.y};
        this.imgSrc = "./img/maps/map1.png"
        document.body.appendChild(canvas);
    }

    draw(c: CanvasRenderingContext2D | null) {
        const img = new Image();
        img.src = this.imgSrc;
        let x = this.position.x;
        let y = this.position.y;
        img.onload = function() {
            c!.drawImage(img, x, y);
        }
    }
}

export default Background;

