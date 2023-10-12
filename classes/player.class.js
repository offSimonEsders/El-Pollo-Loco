class Player extends MovableObject {
    x = 0;
    y = 185; // 185
    width = 200;
    height = 350;
    deadSound = new Audio('./sounds/hurt.mp3');

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
        this.deadSound.volume = 0.2;
    }

    /**
     * Animates the player object depending on its position
     */
    animate() {

        setInterval(() => {
            if(!world.stopGame) {
                this.movement();
            }
        }, 1000 / 65);

        setInterval(() => {
            this.checkStatus();
        }, 65);
    }

    /**
     * Depending on the acitve parameter the player moves
     */
    movement() {
        if (keyboard.RIGHT && this.x < world.level.level_end_x) {
            this.walkRight();
        }
        if (keyboard.LEFT) {
            this.walkLeft();
        }

        if (keyboard.UP && this.y == 185) {
            this.jump();
        }

        world.camera_x = -this.x;
    }
    
    walkRight() {
        this.x += 10;
        this.otherDirection = false;
    }

    walkLeft() {
        if (this.x > 0) {
            this.x -= 10;
        }
        this.otherDirection = true;
    }

    jump() {
        this.speedY = 30;
    }

    /**
     * Executes functions depending on the actions
     */
    checkStatus() {
        if(this.isDead()) {
            this.playanimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playanimation(this.IMAGES_HURT);
            this.deadSound.pause();
            this.deadSound.play();
        } else if (this.isAboveGround()) {
            this.animateJump();
        } else if (keyboard.RIGHT || keyboard.LEFT) {
            this.animateWalkingleft();
        } else {
            this.playanimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Playes animations
     */
    animateJump() {
        this.playanimation(this.IMAGES_JUMPING);
    }

    animateWalkingleft() {
        this.playanimation(this.IMAGES_WALKING);
    }
}