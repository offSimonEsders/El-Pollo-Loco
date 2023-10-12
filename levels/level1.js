const level1 = new Level(

    returnEnemies(),
    returnClouds(),
    returnBackground(),
    returnCoins(),
    returnBottles()

);

/**
 * @returns the elements of level1
 */
function returnEnemies() {
    return [
        new Endboss(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
}

function returnClouds() {
    return [
        new Cloud(100),
        new Cloud(1000)
    ];
}

function returnBackground() {
    return [
        new Background('./img/5_background/layers/3_third_layer/1.png', 0),
        new Background('./img/5_background/layers/2_second_layer/1.png', 0),
        new Background('./img/5_background/layers/1_first_layer/1.png', 0),
        new Background('./img/5_background/layers/3_third_layer/2.png', 1000),
        new Background('./img/5_background/layers/2_second_layer/2.png', 1000),
        new Background('./img/5_background/layers/1_first_layer/2.png', 1000),
        new Background('./img/5_background/layers/3_third_layer/1.png', 2000),
        new Background('./img/5_background/layers/2_second_layer/1.png', 2000),
        new Background('./img/5_background/layers/1_first_layer/1.png', 2000),
    ];
}

function returnCoins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ];
}

function returnBottles() {
    return [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ];
}