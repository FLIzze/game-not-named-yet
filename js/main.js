import Player from "./player.js";
import Background from "./background.js";
import Sprite from "./sprite.js";
import Interaction from "./interaction.js";
import * as Collisions from "./collision.js";
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
        for (let i = 0; i < interactions.length; i++) {
            if (checkCollision(player, interactions[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.x -= 2 + player.sprint;
            });
    }
    else if (aPressed && lastkey == 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            }
        }
        for (let i = 0; i < interactions.length; i++) {
            if (checkCollision(player, interactions[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.x += 2 + player.sprint;
            });
    }
    else if (wPressed && lastkey == 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            }
        }
        for (let i = 0; i < interactions.length; i++) {
            if (checkCollision(player, interactions[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.y += 2 + player.sprint;
            });
    }
    else if (sPressed && lastkey == 's') {
        for (let i = 0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            }
        }
        for (let i = 0; i < interactions.length; i++) {
            if (checkCollision(player, interactions[i], lastkey)) {
                moving = false;
            }
        }
        if (moving)
            movables.forEach(move => {
                move.position.y -= 2 + player.sprint;
            });
    }
    background.draw(c);
    // boundaries.forEach(boundary => {
    //     checkCollision(player, boundary, "none");
    //     boundary.draw();
    // });
    interactions.forEach(interaction => {
        interaction.draw(c, "./img/water/water.png");
    });
    pnj.draw(c);
    player.draw(c);
    pnj2.draw(c);
}
function checkInteraction() {
    for (let i = 0; i < interactions.length; i++) {
        if (checkCollision(player, interactions[i], lastkey)) {
            console.log("interaction");
        }
    }
}
const offset = {
    x: -2000,
    y: -200,
};
let moving = true;
const collisionsMap = [];
for (let i = 0; i < Collisions.default.Collisions.length; i += 110) {
    collisionsMap.push(Collisions.default.Collisions.slice(i, i + 110));
}
const interactionsMap = [];
for (let i = 0; i < Collisions.default.Interactions.length; i += 100) {
    interactionsMap.push(Collisions.default.Interactions.slice(i, i + 110));
}
console.log(interactionsMap);
const mapZoomLevel = 4.5;
const tileSize = 16;
const boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1) {
            boundaries.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y));
        }
    });
});
const interactions = [];
interactionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1) {
            interactions.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y));
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
const pnj = new Sprite({ x: -200 * 4.5, y: 0 }, "./img/water/water.png", canvas);
const player = new Player(canvas);
const pnj2 = new Sprite({ x: 16 * 4.5, y: 0 }, "./img/water/water.png", canvas);
const movables = [background, ...boundaries, pnj, pnj2, ...interactions];
let lastkey = "";
window.addEventListener("keydown", (e) => {
    if (e.key == 'e') {
        checkInteraction();
    }
});
animate();
