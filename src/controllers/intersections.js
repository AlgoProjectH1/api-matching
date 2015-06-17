/**
 *
 * Constructor
 * @param int gobanSize
 */
var Intersections = function (gobanSize) {
    this.interCount = gobanSize;
    this.intersections = this.initIntersections(false);
};


/**
 *
 * Init the intersections
 * @param bool autocomplete (optional)
 * @return array
 */
Intersections.prototype.initIntersections = function (autocomplete) {
    var intersections = [];

    for (var x = 0; x < this.interCount; x++) {
        intersections[x] = [];

        for (var y = 0; y < this.interCount; y++) {
            if (autocomplete === true)
                intersections[x][y] = this.selectRandomState();
            else
                intersections[x][y] = 0;
        }
    }

    return intersections;
};


/**
 *
 * Set the coord to a given player
 * @param array coords
 * @param int player
 */
Intersections.prototype.set = function (coords, player) {
    this.intersections[coords.x][coords.y] = player;
};


/**
 *
 * Get the value of a given coord
 * @param int x
 * @param int y
 * @return int
 */
Intersections.prototype.get = function (x, y) {
    if (!x && x != 0)
        return this.intersections;

    return this.intersections[x][y];
};


module.exports = Intersections;
