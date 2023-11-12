"use strict";
class Player {
    constructor() {
        this.position = { x: canvas.width / 2, y: canvas.height / 2 };
        this.imgSrc = "/img/player_down.png";
        this.height = 21 * mapZoomLevel;
        this.width = 13 * mapZoomLevel;
        document.body.appendChild(canvas);
    }
    draw() {
        const img = new Image();
        img.src = this.imgSrc;
        let x = this.position.x;
        let y = this.position.y;
        let height = this.height;
        let width = this.width;
        img.onload = function () {
            c.drawImage(img, x, y, width, height);
        };
    }
}
class Background {
    constructor() {
        this.position = { x: offset.x, y: offset.y };
        this.imgSrc = "/img/map.png";
        document.body.appendChild(canvas);
    }
    draw() {
        const img = new Image();
        img.src = this.imgSrc;
        let x = this.position.x;
        let y = this.position.y;
        img.onload = function () {
            c.drawImage(img, x, y);
        };
    }
}
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'd':
            dPressed = true;
            lastkey = 'd';
            break;
        case 'a':
            aPressed = true;
            lastkey = 'a';
            break;
        case 'w':
            wPressed = true;
            lastkey = 'w';
            break;
        case 's':
            sPressed = true;
            lastkey = 's';
            break;
        // case ' ':
        //     spacePressed = true;
        //     break
    }
});
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'd':
            dPressed = false;
            break;
        case 'a':
            aPressed = false;
            break;
        case 'w':
            wPressed = false;
            break;
        case 's':
            sPressed = false;
            break;
        // case ' ':
        //     spacePressed = false;
        //     break
    }
});
function animate() {
    window.requestAnimationFrame(animate);
    if (dPressed && lastkey == 'd') {
        movables.forEach(move => {
            move.position.x -= 2;
        });
        player.imgSrc = "img/player_right.png";
    }
    else if (aPressed && lastkey == 'a') {
        movables.forEach(move => {
            move.position.x += 2;
        });
        player.imgSrc = "img/player_left.png";
    }
    else if (wPressed && lastkey == 'w') {
        movables.forEach(move => {
            move.position.y += 2;
        });
        player.imgSrc = "img/player_up.png";
    }
    else if (sPressed && lastkey == 's') {
        movables.forEach(move => {
            move.position.y -= 2;
        });
        player.imgSrc = "img/player_down.png";
    }
    background.draw();
    // boundaries.forEach(boundary => {
    //     boundary.draw();
    // });
    testboundary.draw();
    player.draw();
}
const offset = {
    x: 0,
    y: 0,
};
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 110) {
    collisionsMap.push(collisions.slice(i, i + 110));
}
const mapZoomLevel = 4.5;
const tileSize = 16;
class Boundary {
    constructor(positionX = 0, positionY = 0) {
        this.position = { x: positionX, y: positionY };
        this.height = tileSize * mapZoomLevel;
        this.width = tileSize * mapZoomLevel;
    }
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
Boundary.width = tileSize * mapZoomLevel;
Boundary.height = tileSize * mapZoomLevel;
// const boundaries: Array<Boundary> = []
// collisionsMap.forEach((row, i) => {
//     row.forEach((symbol, j) => {
//         if (symbol == 7) {
//             boundaries.push(new Boundary(j * Boundary.width + offset.x, i * Boundary.height + offset.y));
//         }
//     });
// });
// console.log(boundaries);
const testboundary = new Boundary(900, 200);
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
let dPressed = false;
let aPressed = false;
let wPressed = false;
let sPressed = false;
const background = new Background();
const player = new Player();
const movables = [background, testboundary];
let lastkey = "";
animate();
