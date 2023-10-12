class Coin extends MovableObject {
    width = 150;
    height = 150;

    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    currentImage = 0;

    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate(this.IMAGES);
        this.x = Math.random() * 1800;
        this.y = Math.max(Math.random() * 400, 200);
    }

    /**
     * Playes the Coin animation
     */
    animate() {
        setInterval(() => {
            this.playanimation(this.IMAGES);
        }, 200);
    }
}