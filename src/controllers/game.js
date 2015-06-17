/**
 *
 * Constructor
 * @param int gobanSize
 */
 var Game = function (gobanSize) {
    this.currentPlayer = 1;
    this.gameState = 1;
    this.Intersections = new Intersections(gobanSize);
};


/**
 *
 * Switch player
 */
Game.prototype.switchPlayer = function () {
    this.currentPlayer = (this.currentPlayer == 1) ? 2 : 1;

    $('.infos_container.turn').removeClass('turn');
    $('.infos_container[data-player="'+ this.currentPlayer +'"]').addClass('turn');
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
