class ThrowableObject extends MovableObject {

    height = 100;
    width = 50;

    destroyed = false;

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    
    IMAGES_DESTROYED = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_DESTROYED);
    }

    throw(x,y) {
        this.x = x + 150;
        this.y = y + 150;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if(this.destroyed) {
                this.speedY = 0;
                this.playanimation(this.IMAGES_DESTROYED);
            } else {
                this.x += 10;
                this.playanimation(this.IMAGES_BOTTLE);
            }
        }, 25);
    }

    changeStatus() {
        this.destroyed = true;
    }
    
}