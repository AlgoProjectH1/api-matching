/**
 *
 * Constructor
 * @param int player
 * @param array goban
 */
var NodeEmptyDetection = function (goban) {
    this.goban = goban;
    this.player = 0;
    this.nodes = [];
    this.traversed = [];
};


/**
 *
 * Select the player stones
 * @return array
 */
NodeEmptyDetection.prototype.selectPlayerStones = function () {
    var playerStones = [];

    for (var x in this.goban) {
        for (var y in this.goban[x]) {
            if (this.goban[x][y] === this.player) playerStones.push({ x: x, y: y });
        }
    }

    return playerStones;
};


/**
 *
 * Get the stone dimensions
 * @param array stoneCoord
 * @return array
 */
NodeEmptyDetection.prototype.getDimensions = function (stoneCoord) {
    var stoneDimensions = [];
    var x = parseInt(stoneCoord.x);
    var y = parseInt(stoneCoord.y);

    if ((x + 1) < this.goban.length) stoneDimensions.push({ x: (x + 1), y: y });
    if ((x - 1) >= 0) stoneDimensions.push({ x: (x - 1), y: y });
    if ((y + 1) < this.goban.length) stoneDimensions.push({ x: x, y: (y + 1) });
    if ((y - 1) >= 0) stoneDimensions.push({ x: x, y: (y - 1) });

    return stoneDimensions;
};


/**
 *
 * Get the stone friends
 * @param array stoneDimensions
 * @return array
 */
NodeEmptyDetection.prototype.hasFriends = function (stoneDimensions) {
    var friends = {};

    for (var dimension in stoneDimensions) {
        var dimensionCoords = stoneDimensions[dimension];
        var index = dimensionCoords.x +":"+ dimensionCoords.y;

        if (this.goban[dimensionCoords.x][dimensionCoords.y] === this.player) {
            friends[index] = { x: dimensionCoords.x, y: dimensionCoords.y };
        }
    }

    return friends;
};


/**
 *
 * Get the liberties of a stone
 * @param array dimensions
 * @return int
 */
NodeEmptyDetection.prototype.getLiberties = function (dimensions) {
    var libertiesCount = 0;

    for (var dimension in dimensions) {
        var dimensionCoords = dimensions[dimension];
        var index = dimensionCoords.x +":"+ dimensionCoords.y;

        if (this.goban[dimensionCoords.x][dimensionCoords.y] === 0) {
            libertiesCount++;
        }
    }

    return libertiesCount;
};


/**
 *
 * Return if the stone has already been traversed
 * @param string identifier
 * @return bool
 */
NodeEmptyDetection.prototype.hasBeenTraversed = function (identifier) {
    return (this.traversed.indexOf(identifier) > -1) ? true : false;
};


/**
 *
 * Get the player nodes
 * @return array
 */
NodeEmptyDetection.prototype.getNodes = function () {
    var playerStones = this.selectPlayerStones();
    var nodeIndex = 0;

    for (var stone in playerStones) {
        var currentStone = playerStones[stone];
        var stoneIdentifier = currentStone.x +":"+ currentStone.y;

        if (this.hasBeenTraversed(stoneIdentifier))
            continue;

        if (this.nodes[nodeIndex] === undefined)
            this.nodes[nodeIndex] = {stones: {}, freedom: 0};

        this.getNodesFriends(currentStone, nodeIndex);
        nodeIndex++;
    }

    return this.nodes;
};


/**
 *
 * Get the neighbors of a stone
 * @param array dimensions
 * @param int player
 * @return int
 */
NodeEmptyDetection.prototype.getNeighbors = function (dimensions, player) {
    var neighbors = 0;

    for (var dimension in dimensions) {
        var dimensionCoords = dimensions[dimension];
        var index = dimensionCoords.x +":"+ dimensionCoords.y;

        if (this.goban[dimensionCoords.x][dimensionCoords.y] === player) {
            neighbors++;
        }
    }

    return neighbors;
};


/**
 *
 * Recursive node detector
 * @param obj stone
 * @param int nodeIndex
 */
NodeEmptyDetection.prototype.getNodesFriends = function (stone, nodeIndex) {
    var currentStone = stone;
    var currentStoneIdentifier = currentStone.x +":"+ currentStone.y;

    if (this.hasBeenTraversed(currentStoneIdentifier))
        return;

    var stoneDimensions = this.getDimensions(currentStone);
    var stoneFriends = this.hasFriends(stoneDimensions);

    if (this.nodes[nodeIndex].neighbors === undefined)
        this.nodes[nodeIndex].neighbors = {black: 0, white: 0};

    // Put stones in node
    this.nodes[nodeIndex].neighbors.black += this.getNeighbors(stoneDimensions, 1);
    this.nodes[nodeIndex].neighbors.white += this.getNeighbors(stoneDimensions, 2);
    this.nodes[nodeIndex].stones[currentStoneIdentifier] = currentStone;
    this.traversed.push(currentStoneIdentifier);

    for (var friend in stoneFriends) {
        this.getNodesFriends(stoneFriends[friend], nodeIndex);
    }
};



module.exports = NodeEmptyDetection;
