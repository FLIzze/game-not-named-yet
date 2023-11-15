class Dialogue {
    public canvasText: HTMLCanvasElement;
    public cText: CanvasRenderingContext2D | null;
    public isUsed: boolean = false;
    public frameCount: number = 0;
    constructor(public text: string, public position: {x:number,y:number}, public color: string) {
        this.text = text;
        this.position.x = position.x;
        this.position.y = position.y;
        this.canvasText = document.createElement('canvas');
        this.canvasText.width = 1920;
        this.canvasText.height = 1080;
        this.cText = this.canvasText.getContext('2d');
        document.body.appendChild(this.canvasText);
    }

    draw() {
        this.cText!.clearRect(0, 0, this.canvasText.width, this.canvasText.height);
        if (this.text != "") {
            this.cText!.font = "30px Arial";
            this.cText!.fillStyle = this.color
            this.cText!.fillText(this.text, this.position.x, this.position.y-18)
        } else {
            this.cText!.clearRect(0, 0, this.canvasText.width, this.canvasText.height);
        }
    }
}

export default Dialogue;