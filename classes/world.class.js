class World {

    // Player
    character = new Player();

    // Inventory
    itemstothrow = [];
    throwed = [];
    canThrow = true;

    // Level objects
    level = level1;
    enemies = this.level.enemies;
    clouds = this.level.clouds;
    backgroundobjects = this.level.backgroundobjects;

    // In-game items 
    coin = this.level.coins;
    bottle = this.level.bottles;

    // Camera startposition 
    camera_x = 0;

    // Canvas
    canvas;
    ctx;
    save;

    // Itembars
    statusbar = new Playerbar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    bossbar = new Bossbar();

    // Stop game
    stopGame = true;

    // Sounds
    bottlesound = new Audio('./sounds/bottle.mp3');
    coinsound = new Audio('./sounds/getcoin.mp3');

    // Restartbtn
    restartbtn = document.getElementById('restart');

    // Keyboard
    keyboard;

    // Animate endboss
    activated = false;

    // Win and lose sound
    winsound = new Audio('./sounds/win.mp3');
    losesound = new Audio('./sounds/lose.mp3');

    /**
     * 
     * 
     * @param {*} canvas - canvas The canvas element to draw the world on
     * @param {*} keyboard - keyboard The keyboard object to listen for keyboard input
     */
    constructor(canvas, keyboard) {
        this.createCanvas(canvas);
        this.keyboard = keyboard;
        this.collusionsInterval();
        this.activateEndboss();
        this.lowerVolume();
    }

    /**
     * Creates a drawing context *ctx* on the canvas
     * 
     * @param {*} canvas 
     */
    createCanvas (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.save = this.ctx.save();
    }

    /**
     * Activates the endboss when the player reaches 1040 at the x-axis
     */
    activateEndboss() {
        setInterval(() => {
            if(this.character.x >= 1040 && !this.activated) {
                this.activated = true;
                this.playBoss();
            }
        }, 50);
    }

    /**
     * Executes the functions every 50 ms to check whether something has collided
     */
    collusionsInterval() {
        setInterval(() => {
            if (!this.stopGame) {
                this.checkCollisions();
            }
        }, 50);
    }

    checkCollisions() {
        this.collusionEnemy();
        this.collusionCoin();
        this.collusionBottle();
        this.collusionThrowedobject();
    }

    /**
     * Draws the content to the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.addContent();
        this.repeatDraw();
        this.changeendbg();
    }

    /**
     * Checks if something collided with a enemie-object
     */
    collusionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy instanceof Chicken && !enemy.dead && !this.character.isHurt()) {
                this.killChicken(enemy);
            } else if (this.character.isColliding(enemy) && enemy instanceof Chicken) {
                this.withChicken();
            } else if (this.character.isColliding(enemy) && enemy instanceof Endboss) {
                this.withEndboss();
            }
        });
    }

    /**
     * When the player collides with an enemy, it gets hit
     */
    withChicken() {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
    }

    /**
     * When the player collides with the endboss, its energy goes to zero
     */
    withEndboss() {
        this.character.hit();
        this.character.energy -= this.character.energy;
        this.statusbar.setPercentage(this.character.energy);
    }

    /**
     * When player collides with a coin it collects one
     */
    collusionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsound.pause();
                this.coinsound.currentTime = 0;
                this.coinsound.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinbar.percentage += 20;
                this.coinbar.setPercentage(this.coinbar.percentage);
            }
        });
    }

    /**
     * Returns the image dependet on the percentage
     */
    setBossbar() {
        this.bossbar.percentage -= 20;
        this.bossbar.setPercentage(this.bossbar.percentage);
    }

    /**
     * When player collides with a bottle it collects one
     */
    collusionBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottlesound.pause();
                this.bottlesound.currentTime = 0.5;
                this.bottlesound.play();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottlebar.percentage += 20;
                this.bottlebar.setPercentage(this.bottlebar.percentage);
                this.itemstothrow.push(1);
            }
        });
    }

    /**
     * When a throwed bottle collides with the ground it gets destroyed
     * When a throwed bottle collides with the endboss the endboss gets damage and the bottle gets destroyed 
     */
    collusionThrowedobject() {
        this.throwed.forEach((throwedbottle) => {
            if(this.enemies[0].isColliding(throwedbottle) && this.enemies[0].y + this.enemies[0].height > throwedbottle.y) {
                this.destroyBottle(throwedbottle);
                this.enemies[0].hit();
            } else if(throwedbottle.y > 400) {
                this.destroyBottle(throwedbottle);
            }
        })
    }

    /**
     * Adds the content from level1, player, background and itembar to the canvas
     */
    addContent() {
        this.ctx.translate(this.camera_x, 0);
        this.addBackground();
        this.interactableItems();
        this.addTomap(this.character);
        this.itemsBars();
        this.ctx.translate(-this.camera_x, 0);
    }

    addBackground() {
        this.addObjectstomap(this.backgroundobjects);
        this.addObjectstomap(this.clouds);
    }

    interactableItems() {
        this.addObjectstomap(this.enemies);
        this.addObjectstomap(this.bottle);
        this.addObjectstomap(this.coin);
        this.addObjectstomap(this.throwed);
    }

    itemsBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addTomap(this.statusbar);
        this.addTomap(this.coinbar);
        this.addTomap(this.bottlebar);
        if(this.activated) {
            this.addTomap(this.bossbar);
        }
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Reloads the canvas by it self
     */
    repeatDraw() {
        let self = this;
        requestAnimationFrame(() => {
            if (this.stopGame) {
                return
            }
            self.draw();
        })
    }

    /**
     * Adds the given object/objects to the canvas
     * 
     * @param {*} object 
     */
    addObjectstomap(object) {
        object.forEach(ob => {
            this.addTomap(ob)
        })
    }

    addTomap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageback(mo);
        }
    }

    /**
     * Flips the image for the player if it walks to the left
     * 
     * @param {*} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image for the player back if it walks to the right
     * 
     * @param {*} mo 
     */
    flipImageback(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Stops the music and game when game is ended
     * Clears the Canvas when game is ended
     */
    showEndscreen() {
        world.stopGame = true;
        bg_music.pause();
        world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Changes the background depending on the game ending event
     * Playes music depending on the game ending event
     */
    changeendbg() {
        if (this.character.isDead() || this.enemies[0].isDead()) {
            startstoppbtn.disabled = true;
            setTimeout(() => {
                if (this.character.isDead()) {
                    this.lostScreen();
                    this.losesound.play();
                } else if (this.enemies[0].isDead()) {
                    this.wonScreen();
                    this.winsound.play();
                }
            }, 500);
        }
    }

    /**
     * Shows endscreen
     */
    lostScreen() {
        this.showEndscreen();
        this.canvas.classList.remove('gamebg');
        this.canvas.classList.add('lostbg');
    }

    /**
     * Shows winscreen
     */
    wonScreen() {
        this.showEndscreen();
        this.canvas.classList.remove('gamebg');
        this.canvas.classList.add('wonbg');
    }

    /**
     * When the player collides with the top of a chicken, it gets removed from the game
     * 
     * @param {*} chickentokill 
     */
    killChicken(chickentokill) {
        this.character.jump();
        chickentokill.killed();
        setTimeout(() => {
            this.enemies.splice(this.enemies.indexOf(chickentokill), 1);
        }, 300);
    }

    /**
     * Animates the endboss
     */
    playBoss() {
        this.enemies[0].animateBoss();
    }

    /**
     * Throws a bottle if there are more then 0 bottles
     * Only works ones a second
     */
    throwBottle() {
        if(this.itemstothrow.length > 0 && this.canThrow) {
            this.checkOnInventory();
            setTimeout(() => {
                this.canThrow = true;
            }, 1000);
        }
    }

    /**
     * Changes the bottlebar depending on how many bottles are collected and throwed
     */
    checkOnInventory() {
        let bottle = new ThrowableObject();
            bottle.throw(this.character.x, this.character.y);
            this.throwed.push(bottle);
            this.itemstothrow.splice(0,1);
            this.canThrow = false;
            this.bottlebar.percentage -= 20;
            this.bottlebar.setPercentage(this.bottlebar.percentage);
    }

    /**
     * Playes the bottlesound
     */
    playBottlesound() {
        this.bottlesound.currentTime = 0.15;
        this.bottlesound.pause();
        this.bottlesound.play();
    }

    /**
     * Playes the destruction animation of the destroyed bottle
     * 
     * @param {*} throwedbottle 
     */
    destroyBottle(throwedbottle) {
        if(!throwedbottle.destroyed) {
            throwedbottle.changeStatus();
            this.playBottlesound();
            setTimeout(() => {
                this.throwed.splice(throwedbottle, 1);
            }, 150);
        }
    }

    lowerVolume() {
        this.bottlesound.volume = 0.2;
        this.coinsound.volume = 0.2;
        this.winsound.volume = 0.2;
        this.losesound.volume = 0.2;
    }

}