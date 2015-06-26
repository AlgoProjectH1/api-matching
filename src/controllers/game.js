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
 * @param int player
 */
Game.prototype.verifyNodesToDie = function (nodes, player) {
    player = (player === 1) ? 2 : 1;

    for (var node in nodes) {
        var currentNode = nodes[node];

        if (currentNode.freedom === 0) {
            for (var stone in currentNode.stones) {
                var currentStone = currentNode.stones[stone];
                this.Intersections.set(currentStone, 0);
                this.captures[player]++;
            }
        }
    }
};


/**
 *
 * Count the points of every player
 * @return object
 */
Game.prototype.countPoints = function () {
    var nodeController = new global.controllers.nodeEmptyDetection(this.Intersections.get());
    var nodes = nodeController.getNodes();

    for (var node in nodes) {
        var currentNode = nodes[node];
        var currentPlayer = 0;
        var toAdd = 0;

        for (var stone in currentNode.stones) { toAdd++; }

        if (currentNode.neighbors.black === 0 && currentNode.neighbors.white > 1) {
            this.captures[2] += toAdd;
        } else if (currentNode.neighbors.white === 0 && currentNode.neighbors.black > 1) {
            this.captures[1] += toAdd;
        }
    }

    // KOMI
    this.captures[2] += 7.5;

    return this.captures;
};


module.exports = Game;
