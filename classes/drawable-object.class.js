class DrawableObject {
    img;
    imageCache = {};
    x = 0;
    y = 0;
    currentImage = 0;
    width;
    height;

    /**
     * Shows the starting image
     * 
     * @param {*} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads the given images to the cache
     * 
     * @param {Array} arr - [img/image1.png, ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draws the images to the canvas
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}