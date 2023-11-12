"use strict";
class Player {
    constructor() {
        this.position = { x: canvas.width / 2, y: canvas.height / 2 };
        this.imgSrc = "/img/player_down.png";
        this.height = 21 * mapZoomLevel - 5;
        this.width = 13 * mapZoomLevel + 1;
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
function checkCollision(entity1, entity2) {
    // console.log(entity2.bondary.position.x, entity2.position.x);
    return (entity1.position.x + entity1.width >= entity2.bondary.position.x &&
        entity1.position.x <= entity2.bondary.position.x + entity2.width &&
        entity1.position.y <= entity2.bondary.position.y + entity2.height &&
        entity1.position.y + entity2.height >= entity2.bondary.position.y);
}
function animate() {
    window.requestAnimationFrame(animate);
    if (dPressed && lastkey == 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            console.log("oui");
        }
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
    boundaries.forEach(boundary => {
        // checkCollision(player, boundary);
        boundary.draw();
    });
    player.draw();
}
const offset = {
    x: -2300,
    y: -300,
};
let moving = true;
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
const boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 7) {
            boundaries.push(new Boundary(j * Boundary.width + offset.x, i * Boundary.height + offset.y));
        }
    });
});
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
const movables = [background, ...boundaries];
let lastkey = "";
animate();
