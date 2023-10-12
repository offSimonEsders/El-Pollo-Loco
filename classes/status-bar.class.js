class Statusbar extends DrawableObject {
    IMAGES;
    percentage;

    /**
     * Changes the percentage and the showed image depending on the percentage
     * 
     * @param {*} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getIndex()];
        this.img = this.imageCache[path];

    }

    getIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}