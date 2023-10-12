class Background extends MovableObject {
    x = 0;
    y = 50;
    width = 1000;
    height = 550;

    constructor(imagePath, newx) {
        super().loadImage(imagePath);
        this.x = newx;
    }

}