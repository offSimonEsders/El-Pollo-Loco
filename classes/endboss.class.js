class Endboss extends MovableObject{
    y=185;
    width = 200;
    height = 350;

    energy = 100;

    animateIntro;

    speed = 3;

    playhit = false;

    otheranimation = false;

    isDamaged = false;

    hitanimation;

    deadSound = new Audio('./sounds/chicken.mp3');

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_INTRO = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2000;
        this.deadSound.volume = 0.2;
    }

    animateBoss() {
        
        this.animateIntro = setInterval(() => {
            this.playanimation(this.IMAGES_INTRO);
        }, 200);

        setTimeout(() => {
            clearInterval(this.animateIntro);
            this.moveLeft();
        }, 2000);
        
    }

    hit() {

        this.deadSound.pause();
        this.deadSound.play();

        if(!this.isDamaged) {
            this.isDamaged = true;
            this.otheranimation = true;
            this.energy -= 20;
            this.playhit = true;
            this.hitAnimation();
            this.clearAnimation();
        }
    }
        /**
         * Playes an animation depending on the status of the endboss
         */
        hitAnimation() {
            world.setBossbar();
            this.hitanimation = setInterval(() => {
                if(this.energy <= 0 && this.playhit) {
                    this.playanimation(this.IMAGES_DEAD);
                } else if(this.energy > 0 && this.playhit) {
                    this.playanimation(this.IMAGES_HURT);
                }
            }, 200);
        }

        /**
         * Ends animation so that other animations can be played, like walking
         */
        clearAnimation() {
            setTimeout(() => {
                clearInterval(this.hitanimation)
                this.playhit = false;
                if(this.energy > 0) {
                    this.otheranimation = false;
                    this.isDamaged = false;
                } else {
                    this.playanimation(this.IMAGES_DEAD);
                }
            }, 650);
        }

}