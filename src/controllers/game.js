/**
 *
 * Constructor
 * @param int gobanSize
 */
var Game = function (gobanSize) {
    this.currentPlayer = 1;
    this.gameState = 1;
    this.captures = {1: 0, 2: 0};
    this.skipped = false;
    this.Intersections = new global.controllers.intersections(gobanSize);
};


/**
 *
 * Switch player
 */
Game.prototype.switchPlayer = function () {
    this.currentPlayer = (this.currentPlayer == 1) ? 2 : 1;
};


/**
 *
 * Set skipped
 * @param boolean state
 */
Game.prototype.setSkipped = function (state) {
    this.skipped = state;
};


/**
 *
 * Verify nodes to die
 * @param object nodes
 */
Game.prototype.verifyNodesToDie = function (nodes) {
    for (var node in nodes) {
        var currentNode = nodes[node];

        if (currentNode.freedom === 0) {
            for (var stone in currentNode.stones) {
                var currentStone = currentNode.stones[stone];
                this.Intersections.set(currentStone, 0);
            }
        }
    }
};


module.exports = Game;
