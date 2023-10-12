let canvas;
let world;
let keyboard = new Keyboard();

// Check on status
let click = false;
let fullscreenstate = false;

// Buttons
const extracon = document.getElementById('game');
const startstoppbtn = document.getElementById('startstoppbtn');
const mutebtn = document.getElementById('mutebtn');
const fullscreenbtn = document.getElementById('fullscreen');
const controlsbtn = document.getElementById('controlsbtn');
const controls = document.querySelector('.controls');




// Background music
let volume = true;
const bg_music = new Audio('./sounds/background_music.mp3');
bg_music.loop = true;
bg_music.volume = 0.1;

// Initial the game
init();

/**
 * Creates the canvas and add it and the keyboard to the World object
 * It also clears the Canvas that it is empty on a reload
 *
 * @param {canvas} - contains the generated ojects from the Game
 * @param {keyboard} - gives us a boolean value when a control button is activated or deactivated
 *
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Depending on the value of the variable stopGame this eventlistener starts or stops the game
 */
startstoppbtn.addEventListener('click', () => {
    if (world.stopGame == true) {
        playGame();
    } else {
        stopGame();
    }
});

/**
 * Starts or restarts the game on changing the value of the stopGame variable and restarting the draw function
 */
function playGame() {
    world.stopGame = false;
    world.draw();
    click = false;
    gamebg();
    bg_music.play();
    changeStartbtn();
}

/**
 * Stops the game on changing the value of the stopGame variable
 */
function stopGame () {
    world.stopGame = true;
    bg_music.pause();
    click = true;
    changeStartbtn();
}

/**
 * Changes the background of the canvas to the in-game-background
 */
function gamebg() {
    canvas.classList.add("gamebg");
}

/**
 * Removes the in-game-background of the canvas
 */
function gamebgremove() {
    canvas.classList.remove("gamebg");
}

/**
 * Mutes the background music
 */
mutebtn.addEventListener('click', () => {
    if (!volume) {
        bg_music.volume = 0.2;
        volume = true;
        changeMutebtn();
    } else {
        bg_music.volume = 0.0;
        volume = false;
        changeMutebtn();
    }
});

/**
 * Enter or exit the fullscreen of the canvas
 */
fullscreenbtn.addEventListener('click', () => {
    if (!fullscreenstate) {
        fullscreenstate = true;
        changeFullscrennbtn();
        extracon.requestFullscreen();
    } else {
        fullscreenstate = false;
        changeFullscrennbtn();
        document.exitFullscreen();
    }
});

/**
 * Hides the gamecontrols of the keyboard
 */
controlsbtn.addEventListener('click', () => {
    controls.classList.remove('d-none');
})

/**
 * Shows the gamecontrols of the keyboard
 */
controls.addEventListener('click', () => {
    if(!controls.classList.contains('d-none')) {
        controls.classList.add('d-none');
    }
});

/**
 * Changes the Icons of the start button
 */
function changeStartbtn() {
    if (!click) {
        startstoppbtn.innerHTML = /*html*/`
            <span class="material-symbols-outlined">
                play_arrow
            </span>
        `;
    } else {
        startstoppbtn.innerHTML = /*html*/`
            <span class="material-symbols-outlined">
                pause
            </span>
        `
    }
}

/**
 * Changes the Icons of the mute button
 */
function changeMutebtn() {
    if (volume) {
        mutebtn.innerHTML = /*html*/`
            <span class="material-symbols-outlined">
                volume_up
            </span>
        `;
    } else {
        mutebtn.innerHTML = /*html*/`
            <span class="material-symbols-outlined">
                volume_off
            </span>
        `;
    }
}

/**
 * Changes the Icons of the fullscreen button
 */
function changeFullscrennbtn() {
    if(!fullscreenstate) {
        fullscreenbtn.innerHTML = /*html*/`
            <span class="material-symbols-outlined">
                fullscreen
            </span>
        `;
    } else {
        fullscreenbtn.innerHTML = /*html*/`
            <span class="material-symbols-outlined">
                fullscreen_exit
            </span>
        `;
    }
}

/**
 * Reloads the website to reload the game
 */
function reloadgame() {
    window.location.reload();
}