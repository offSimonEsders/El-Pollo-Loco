class Level {
    enemies;
    clouds;
    backgroundobjects;
    coins;
    bottles;
    level_end_x = 2000;

    /**
     * Gets the level info from the level object
     * 
     * @param {*} enemies 
     * @param {*} clouds 
     * @param {*} backgroundobjects 
     * @param {*} coins 
     * @param {*} bottles 
     */
    constructor(enemies, clouds, backgroundobjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundobjects = backgroundobjects;
        this.coins = coins;
        this.bottles = bottles;
    }

}