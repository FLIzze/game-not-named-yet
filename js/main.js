import Player from "./player";
import Background from "./background";
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
        case ' ':
            player.sprint = 1.5;
            break;
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
        case ' ':
            player.sprint = 0;
            break;
    }
});
function checkCollision(entity1, entity2, playerDirection) {
    if (playerDirection == 'none')
        return false;
    // console.log(entity2.bondary.position.x, entity2.position.x);
    if (playerDirection == 'd') {
        return (entity1.position.x + entity1.width + 5 >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y <= entity2.position.y &&
            entity1.position.y + entity2.height >= entity2.position.y);
    }
    if (playerDirection == 'a') {
        return (entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x - 5 <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y <= entity2.position.y &&
            entity1.position.y + entity2.height >= entity2.position.y);
    }
    if (playerDirection == 'w') {
        return (entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y - 10 <= entity2.position.y &&
            entity1.position.y + entity2.height >= entity2.position.y);
    }
    if (playerDirection == 's') {
        return (entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y <= entity2.position.y &&
            entity1.position.y + entity2.height + 12 >= entity2.position.y);
    }
}
function animate() {
    if (lastkey == 'd' && dPressed) {
        player.frame.y = 258;
    }
    else if (lastkey == 's' && sPressed) {
        player.frame.y = 208;
    }
    else if (lastkey == 'w' && wPressed) {
        player.frame.y = 352;
    }
    else if (lastkey == 'a' && aPressed) {
        player.frame.y = 306;
    }
    else {
        if (lastkey == 's') {
            player.frame.y = 22;
        }
        else if (lastkey == 'w') {
            player.frame.y = 164;
        }
        else if (lastkey == 'a') {
            player.frame.y = 118;
        }
        else if (lastkey == 'd') {
            player.frame.y = 70;
        }
    }
    moving = true;
    window.requestAnimationFrame(animate);
    if (dPressed && lastkey == 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.x -= 2 + player.sprint;
            });
        player.imgSrc = "img/player/player.png";
    }
    else if (aPressed && lastkey == 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.x += 2 + player.sprint;
            });
        player.imgSrc = "img/player/player.pn";
    }
    else if (wPressed && lastkey == 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.y += 2 + player.sprint;
            });
        player.imgSrc = "img/player/player.png";
    }
    else if (sPressed && lastkey == 's') {
        for (let i = 0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.y -= 2 + player.sprint;
            });
        player.imgSrc = "img/player/player.png";
    }
    background.draw(c);
    // boundaries.forEach(boundary => {
    //         checkCollision(player, boundary, "none");
    //         boundary.draw();
    //     });
    player.draw(c);
}
const offset = {
    x: -2000,
    y: -100,
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
        if (symbol == 1) {
            boundaries.push(new Boundary(j * Boundary.width + offset.x, i * Boundary.height + offset.y));
        }
    });
});
const canvas = document.createElement('canvas');
canvas.width = 1920;
canvas.height = 1080;
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
let dPressed = false;
let aPressed = false;
let wPressed = false;
let sPressed = false;
const background = new Background(offset, canvas);
const player = new Player(canvas);
const movables = [background, ...boundaries];
let lastkey = "";
animate();
