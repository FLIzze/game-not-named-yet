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
            break;
        case 's':
            sPressed = true;
            lastkey = 's';
            break;
        case ' ':
            sprintingSpeed = 1.5;
            break;
        case 'e':
            ePressed = true;
            break;
    }
})

let ePressed = false;

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
            break;
        case ' ':
            sprintingSpeed = 0;
            break;
        case 'e':
            ePressed = false;
            break;
    }
})

function checkCollision(entity1: Player, entity2: Interaction, playerDirection: string) {
    if (playerDirection == 'none') return false;
    if (playerDirection == 'd') {
        return (
            entity1.position.x + entity1.width + 3 >= entity2.position.x &&
            entity1.position.x <= entity2.position.x + entity2.width - 22 &&
            entity1.position.y <= entity2.position.y- entity1.height/1.5 &&
            entity1.position.y + entity2.height >= entity2.position.y - entity1.height/1.5
        )
    }
    if (playerDirection == 'a') {
        return (
            entity1.position.x + entity1.width >= entity2.position.x &&
            entity1.position.x - 25 <= entity2.position.x + entity2.width - 22 &&
            entity1.position.y <= entity2.position.y - entity1.width/1.5 &&
            entity1.position.y + entity2.height >= entity2.position.y- entity1.height/1.5
        )
    }
    if (playerDirection == 'w') {
        return (
            entity1.position.x + entity1.width >= entity2.position.x + 7 &&
            entity1.position.x <= entity2.position.x + entity2.width - 22 &&
            entity1.position.y - 10 <= entity2.position.y - entity1.width/1.5 &&
            entity1.position.y + entity2.height >= entity2.position.y
        )
    }
    if (playerDirection == 's') {
        return (
            entity1.position.x + entity1.width >= entity2.position.x + 7 &&
            entity1.position.x <= entity2.position.x + entity2.width - 22 &&
            entity1.position.y <= entity2.position.y - entity1.width/1.5 &&
            entity1.position.y + entity2.height + player.height/1.5+3 >= entity2.position.y
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
    console.log(CurrentMap);
    
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

let isOnPRessurePlate = false;

function checkForInteractions() {
    interactions.forEach(interaction => {
        if (interaction.name == "pressure-plate") {
            if (checkCollision(player, interaction, lastkey)) {
                isOnPRessurePlate = true;
        } else {
            isOnPRessurePlate = false;
        }
        } else if (interaction.name == 'exit') {
            if (checkCollision(player, interaction, lastkey)) {
                background.imgSrc = "./img/maps/map2.png"
                CurrentMap = 2;
                mapLoad();
            }
        } else if (isOnPRessurePlate) {
            if (interaction.name == 'fence') {
                interaction.imgSrc = "";
            }
        } else if (!isOnPRessurePlate) {
            if (interaction.name == 'fence') {
                interaction.imgSrc = "./img/fence.png";
            }
        }
    });
}

function mapLoad() {
    let collisionsMap = [];
    let interactionsMap = [];
    boundaries = [];
    interactions = [];
    if (CurrentMap == 1) {
        for (let i = 0; i < Collisions.default.Collisions1.length; i+=40) {
            collisionsMap.push(Collisions.default.Collisions1.slice(i, i+40));
        }
        for (let i = 0;i < Collisions.default.Interactions1.length;i +=40) {
            interactionsMap.push(Collisions.default.Interactions1.slice(i, i+40));
        }
    } else if (CurrentMap == 2) {
        for (let i = 0; i < Collisions.default.Collisions2.length; i+=35) {
            collisionsMap.push(Collisions.default.Collisions2.slice(i, i+35));
        }
        for (let i = 0;i < Collisions.default.Interactions2.length;i +=35) {
            interactionsMap.push(Collisions.default.Interactions2.slice(i, i+35));
        }
    } 
    interactionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol == 4) {
                interactions.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y, "fence", "img/fence.png", 4));
            } else if (symbol == 2) {
                interactions.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y, "pressure-plate", "img/pressure-plate.png"));
            } else if (symbol == 71) {
                interactions.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y, "exit", "img/exit.png"));
            }
        });
    });

    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol == 69) {
                boundaries.push(new Interaction(j * Interaction.width + offset.x, i * Interaction.height + offset.y, "collision", ""));
            }
        });
    });
    console.log(boundaries);
    movables = [background, ...boundaries, ...interactions]
}
let boundaries: Array<Interaction> = []
let interactions: Array<Interaction> = []


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
    if (lastkey == 's') {
        player.imgSrc = "./img/animation-new-player.png"
    } else if (lastkey == 'w')
 {
    player.imgSrc = "./img/animation-new-player-iddle-up.png"
 }}

function moveTo(entity: Interaction, x: number, y: number) {
    entity.position.x = player.position.x;
    entity.position.y = player.position.y;
}

function dialogue(text: string, x: number = canvas.width/2, y: number = canvas.height/2-20) {
    c!.font = "25px Arial";
    c!.fillStyle = "white";
    c!.fillText(text, x, y)
}

const mapZoomLevel = 4.5;
const tileSize = 16;
let CurrentMap = 1;

let sprintingSpeed = 0;
const walkingSpeed = 1.5;
let moving = true;

const collisionsMap = [];
const interactionsMap = [];

if (CurrentMap == 1) {
    for (let i = 0; i < Collisions.default.Collisions1.length; i+=40) {
        collisionsMap.push(Collisions.default.Collisions1.slice(i, i+40));
    }
    for (let i = 0;i < Collisions.default.Interactions1.length;i +=40) {
        interactionsMap.push(Collisions.default.Interactions1.slice(i, i+40));
    }
} else if (CurrentMap == 2) {
    for (let i = 0; i < Collisions.default.Collisions2.length; i+=40) {
        collisionsMap.push(Collisions.default.Collisions2.slice(i, i+40));
    }
    for (let i = 0;i < Collisions.default.Interactions2.length;i +=40) {
        interactionsMap.push(Collisions.default.Interactions2.slice(i, i+40));
    }
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

const offset = {
    x: -0.5*tileSize*mapZoomLevel,
    y: 1.5*tileSize*mapZoomLevel,
}

const background = new Background(offset, canvas);
let movables = [background, ...boundaries, ...interactions];
const player = new Player(canvas);
mapLoad();


let lastkey = ""

animate();


