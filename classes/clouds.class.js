class Cloud extends MovableObject {
    height = 400;
    width = 1000;
    y = -10;

    constructor(positionX) {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = positionX;
        this.animation();
    }

    /**
     * Playes the animation of the Clouds and make them move left
     */
    animation() {
        setInterval(() => {
            if(!world?.stopGame) {
                this.x -= 0.1;
            }
        }, 1000/65);
    }

}