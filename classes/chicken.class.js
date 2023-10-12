class Chicken extends MovableObject {
    x = Math.random() * 1700 + 300;
    y = 425;
    width = 100;
    height = 100;
    dead = false;
    deadSound = new Audio('./sounds/chickenhit.mp3');

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    currentImage = 0;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 3 + Math.random() * 5;
        this.animate();
        this.deadSound.volume = 0.2;
    }

    /**
     * Makes the chicken walking
     */
    animate() {
        if(!this.dead) {
            this.moveLeft();
        }
    }

    /**
     * Playes the death sound of the chicken, showes its animation and change the Status so it can be removed
     */
    killed() {
        this.deadSound.pause();
        this.deadSound.play();
        this.dead = true;
        this.playanimation(this.IMAGES_DEAD);
    }

}