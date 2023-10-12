class Bottle extends MovableObject {
    width= 100;
    height = 100;
    currentImage = 0;

    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.x = Math.random() * 1800;
        this.y = Math.max(Math.random() * 430, 200);
    }

    /**
     * Shows the bottle on the ground without animation
     */
    animate() {
        setInterval(() => {
            this.playanimation(this.IMAGES);
        }, 200);

    }
}