class Bossbar extends Statusbar {

    IMAGES = [
        './img/7_statusbars/1_statusbar/bossbar/0.png',
        './img/7_statusbars/1_statusbar/bossbar/20.png',
        './img/7_statusbars/1_statusbar/bossbar/40.png',
        './img/7_statusbars/1_statusbar/bossbar/60.png',
        './img/7_statusbars/1_statusbar/bossbar/80.png',
        './img/7_statusbars/1_statusbar/bossbar/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 690;
        this.y = 50;
        this.width = 300;
        this.height = 75,
        this.setPercentage(100);
    }

}