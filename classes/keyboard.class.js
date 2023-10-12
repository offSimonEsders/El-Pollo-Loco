class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    E = false;
    phoneright = document.getElementById('phoneright');
    phoneleft = document.getElementById('phoneleft');
    phonejump = document.getElementById('phonejump');
    phonebottle = document.getElementById('phonebottle');

    constructor() {
        this.listenToKeys();
    }

    listenToKeys() {
        this.keysTrue();
        this.keysFalse();
        this.buttonsTrue();
        this.buttonsFalse();
    }

    /**
     * Sets the value associated with the keys to true
     */
    keysTrue() {
        window.addEventListener('keydown', (event) => {
            switch (event['keyCode']) {
                case 37:
                    this.LEFT = true;
                    break;
                case 39:
                    this.RIGHT = true;
                    break;
                case 38:
                    this.UP = true;
                    break;
                case 40:
                    this.DOWN = true;
                    break;
                case 69:
                    world.throwBottle();
                    break;
            }
        });
    }

    /**
     * Sets the value associated with the keys to false
     */
    keysFalse() {
        window.addEventListener('keyup', (event) => {
            switch (event['keyCode']) {
                case 37:
                    this.LEFT = false;
                    break;
                case 39:
                    this.RIGHT = false;
                    break;
                case 38:
                    this.UP = false;
                    break;
                case 40:
                    this.DOWN = false;
                    break;
                case 69:
                    this.E = false;
                    break;
            }
        });
    }

    /**
     * Sets the value associated with the buttons to true
     */
    buttonsTrue() {
        this.phoneright.addEventListener('touchstart', () => {
            this.RIGHT = true;
        });
        this.phoneleft.addEventListener('touchstart', () => {
            this.LEFT = true;
        });
        this.phonejump.addEventListener('touchstart', () => {
            this.UP = true;
        });
        this.phonebottle.addEventListener('touchstart', () => {
            world.throwBottle();
        });
    }

    /**
     * Sets the value associated with the buttons to false
     */
    buttonsFalse() {
        this.phoneright.addEventListener('touchend', () => {
            this.RIGHT = false;
        });
        this.phoneleft.addEventListener('touchend', () => {
            this.LEFT = false;
        });
        this.phonejump.addEventListener('touchend', () => {
            this.UP = false;
        });
        this.phonebottle.addEventListener('touchend', () => {
            this.E = false;
        });
    }

}
