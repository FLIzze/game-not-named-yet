import Background from "./background.js";
import Sprite from "./sprite.js";
import Interaction from "./interaction.js"
import Player from "./player.js"
import collision, * as Collisions from "./collision.js";

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
            break
        case 's':
            sPressed = true;
            lastkey = 's';
            break
        case ' ':
            sprintingSpeed = 1.5;
            break
    }
})

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
            break
        case 's':
            sPressed = false;
            break
        case ' ':
            sprintingSpeed = 0;
            break
    }
})

function checkCollision(entity1: Player, entity2: Interaction, playerDirection: string) {
    if (playerDirection == 'none') return false;
    if (playerDirection == 'd') {
        return (
            entity1.position.x + entity1.width + 5 >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y <= entity2.position.y &&
            entity1.position.y + entity2.height >= entity2.position.y
        )
    }
    if (playerDirection == 'a') {
        return (
            entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x - 5 <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y <= entity2.position.y &&
            entity1.position.y + entity2.height >= entity2.position.y
        )
    }
    if (playerDirection == 'w') {
        return (
            entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y - 10 <= entity2.position.y &&
            entity1.position.y + entity2.height >= entity2.position.y
        )
    }
    if (playerDirection == 's') {
        return (
            entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width - 25 &&
            entity1.position.y <= entity2.position.y &&
            entity1.position.y + entity2.height + 12 >= entity2.position.y
        )
    } else if (playerDirection == 'all') {
        return (
            entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width &&
            entity1.position.y <= entity2.position.y &&
            entity1.position.y + entity2.height >= entity2.position.y
        )
    }
}

function animate() {
    requestAnimationFrame(animate);
    moving = true;
    checkForInteractions();
    checkIfPlayerCollide();
    playerAnimation();

    c!.clearRect;
    background.draw(c);
    interactions.forEach(interaction => {
        interaction.draw(c!);
    });
    player.draw(c);
}

function checkForInteractions() {
    interactions.forEach(interaction => {
        if (checkCollision(player, interaction, lastkey)) {
            if (!interaction.isUsed)
            dialogue("[E] " +interaction.name.toUpperCase());
            window.addEventListener("keydown", (e) => {
                if (e.key == 'e') {
                    interaction.isUsed = true;
                }
            })
            // if (interaction.isUsed) {
            //     if (interaction.name == 'chest') {
            //         interaction.imgSrc = "/img/open-chest.png";
            //     }
            // } 
        } 
    });
}

function checkIfPlayerCollide() {
    if (dPressed && lastkey == 'd') {
        for (let i=0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            } 
        }
    if (moving) 
    movables.forEach(move => {
        move.position.x -= walkingSpeed + sprintingSpeed;
    });

    }
    else if (aPressed && lastkey == 'a') {
        for (let i=0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            } 
        }
    if (moving)
    movables.forEach(move => {
        move.position.x += walkingSpeed + sprintingSpeed;
    });
    
    }
    else if (wPressed && lastkey == 'w') {
        for (let i=0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            } 
        }
    if (moving)
    movables.forEach(move => {
        move.position.y += walkingSpeed + sprintingSpeed;
    });
    }
    else if (sPressed && lastkey == 's')  {
        for (let i=0; i < boundaries.length; i++) {
            if (checkCollision(player, boundaries[i], lastkey)) {
                moving = false;
            } 
        }
    if (moving)
    movables.forEach(move => {
        move.position.y -= 2 + sprintingSpeed;
    });
    }
}

function playerAnimation() {
    if (lastkey == 'd' && dPressed) {
        player.frame.y = 258;
    } else if (lastkey == 's' && sPressed) {
        player.frame.y = 208;
    } else if (lastkey == 'w' && wPressed) {
        player.frame.y = 352;
    } else if (lastkey == 'a' && aPressed) {
        player.frame.y = 306;
    } else {
        if (lastkey == 's') {
            player.frame.y = 22;
        } else if (lastkey == 'w') {
            player.frame.y = 164;
        } else if (lastkey == 'a') {
            player.frame.y = 118;
        } else if (lastkey == 'd') {
            player.frame.y = 70;
        }
    }
}

function dialogue(text: string, x: number = canvas.width/2, y: number = canvas.height/2-20) {
    c!.font = "30px Arial";
    c!.fillStyle = "white";
    c!.fillText(text, x, y)
}

const mapZoomLevel = 4.5;
const tileSize = 16;

let sprintingSpeed = 0;
const walkingSpeed = 1.5;
let moving = true;
const collisionsMap = [];
for (let i = 0; i < Collisions.default.Collisions.length; i+=40) {
    collisionsMap.push(Collisions.default.Collisions.slice(i, i+40));
}

const interactionsMap = [];
for (let i = 0;i < Collisions.default.Interactions.length;i +=40) {
    interactionsMap.push(Collisions.default.Interactions.slice(i, i+40));
}






const canvas = document.createElement('canvas');
canvas.width = 1920;

canvas.height = 1080;
const c = canvas.getContext('2d');
c!.imageSmoothingEnabled = false;

let dPressed = false;
let aPressed = false;
let wPressed = false;
let sPressed = false;

const player = new Player(canvas);
const offset = {
    x: -10*mapZoomLevel*tileSize,
    y: -5*mapZoomLevel*tileSize,
}
const interactions: Array<Interaction> = []
interactionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 70) {
            interactions.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y, "chest", "img/chest-animation.png", 4));
        } else if (symbol == 2) {
            interactions.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y, "pnj", "img/player/player_left.png"));
        }
    });
});

const boundaries: Array<Interaction> = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 69) {
            boundaries.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y, "collision", ""));
        }
    });
});

const background = new Background(offset, canvas);

const movables = [background, ...boundaries, ...interactions];

let lastkey = ""

animate();