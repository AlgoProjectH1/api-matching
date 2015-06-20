/**
 *
 * Constructor
 * @param int player
 * @param array goban
 */
var NodeDetection = function (player, goban) {
    this.player = player;
    this.goban = goban;
    this.nodes = [];
    this.traversed = [];
};


/**
 *
 * Select the player stones
 * @return array
 */
NodeDetection.prototype.selectPlayerStones = function () {
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
NodeDetection.prototype.getDimensions = function (stoneCoord) {
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
NodeDetection.prototype.hasFriends = function (stoneDimensions) {
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
NodeDetection.prototype.getLiberties = function (dimensions) {
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
NodeDetection.prototype.hasBeenTraversed = function (identifier) {
    return (this.traversed.indexOf(identifier) > -1) ? true : false;
};


/**
 *
 * Get the player nodes
 * @return array
 */
NodeDetection.prototype.getNodes = function () {
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
 * Recursive node detector
 * @param obj stone
 * @param int nodeIndex
 */
NodeDetection.prototype.getNodesFriends = function (stone, nodeIndex) {
    var currentStone = stone;
    var currentStoneIdentifier = currentStone.x +":"+ currentStone.y;

    if (this.hasBeenTraversed(currentStoneIdentifier))
        return;

    var stoneDimensions = this.getDimensions(currentStone);
    var stoneFriends = this.hasFriends(stoneDimensions);

    // Put stones in node
    this.nodes[nodeIndex]['freedom'] += this.getLiberties(stoneDimensions);
    this.nodes[nodeIndex]['stones'][currentStoneIdentifier] = currentStone;
    this.traversed.push(currentStoneIdentifier);

    for (var friend in stoneFriends) {
        this.getNodesFriends(stoneFriends[friend], nodeIndex);
    }
};



module.exports = NodeDetection;
