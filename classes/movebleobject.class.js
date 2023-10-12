class MovableObject extends DrawableObject {
    otherDirection = false;
    speedY = 0;
    aceleration = 3;
    energy = 100;
    lastHit = 0;
    deadSound;

    /**
     * Applies physics to the game for jumping or throwing bottles
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.aceleration;
                
                if (this.y != 185 && !this.isAboveGround() && this instanceof Player) {
                    this.y = 185;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if object is above 185 on the y-axis
     * 
     * @returns boolean
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 185;
        }
    }

    /**
     * Used for dameging the player
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks the last time object got hit
     * 
     * @returns boolean
     */
    isHurt() {
        let timespan = new Date().getTime() - this.lastHit;
        timespan /= 1000;
        return timespan < 0.5;
    }

    /**
     * Checks if object.energy <= 0
     * 
     * @returns boolean
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks collisions of the object and returns a boolean
     * 
     * @param {*} obj 
     * @returns boolean
     */
    isColliding(obj) {
        if (obj instanceof Chicken && obj.height != this.y || obj instanceof Endboss || (obj instanceof Bottle && obj.y > this.height) || (obj instanceof Coin && obj.y > this.height)) {
            return this.x + this.width > obj.x + 90 &&
              this.x < obj.x &&
              this.y + this.height > obj.y + 30;
          } else {
            return this.x + this.width > obj.x + 90 &&
              this.x < obj.x &&
              this.y < obj.y - 50;
          }
    }

    /**
     * Makes the objects moving left and play its animation
     */
    moveLeft() {
        setInterval(() => {
            if(this instanceof Chicken && this.dead || world.stopGame || this.otheranimation)
             {return}
            this.playanimation(this.IMAGES_WALKING);
            this.x -= this.speed;
        }, 100);
    }

    /**
     * Shows the images of the object so it generates an animation
     * 
     * @param {*} IMAGES 
     */
    playanimation(IMAGES) {
        if (!world.stopGame) {
            let i = this.currentImage % IMAGES.length;
            let path = IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }
}