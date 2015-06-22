var sha1 = require('sha1');
var Games = function () {
    this.games = {};
};

/**
 * Generate a unique identifier
 * @return string
 */
Games.prototype.generateID = function () {
    do {
        var startSub = Math.floor(Math.random() * (40-7));
        var identifier = sha1(Math.random() * 1000).substr(startSub,  7);
    } while (this.existsGame(identifier));

    return identifier;
};

/**
 * Check if a game exists
 * @param string id
 * @return bool
 */
Games.prototype.existsGame = function (id) {
    return (this.games[id]) ? true : false;
};

/**
 * Add a game
 * @return string
 */
Games.prototype.add = function () {
    var identifier = this.generateID();
    this.games[identifier] = {users: [], rank: 0, infos: {
        goban: [],
        captures: 0,
        turn: 'black'
    }};

    return identifier;
};

/**
 * Get the infos from a game
 * @param string game
 * @return object
 */
Games.prototype.getGameInfos = function (game) {
    return this.games[game].infos;
};

/**
 * Set the game infos
 * @param string game
 * @param infoKey
 * @param infosVal
 */
Games.prototype.setGameInfos = function (game, infoKey, infoVal) {
    this.games[game].infos[infoKey] = infoVal;
};

/**
 * Add a user to a game
 * @param string game
 * @param User userInstance
 */
Games.prototype.addUser = function (game, userInstance) {
    this.games[game].users.push(userInstance);
};

/**
 * Get games
 * @param string id
 * @return array|object
 */
Games.prototype.get = function (id) {
    if (!id) return this.games;

    return this.games[id];
}

/**
 * Get users from game
 * @param string id
 * @return array
 */
Games.prototype.getUsers = function (id) {
    return this.games[id].users;
};

/**
 * Get users count from game
 * @param string id
 * @return int
 */
Games.prototype.countUsers = function (id) {
    return this.games[id].users.length;
};

/**
 * Get available games
 * @return mixed
 */
Games.prototype.getAvailable = function () {
    for (var id in this.games) {
        if (this.countUsers(id) < 2)
            return id;
    }

    return false;
};

/**
 * Delete a game
 * @param string id
 */
Games.prototype.delete = function (id) {
    delete this.games[id];
};

/**
 * Get adversary
 * @param string game
 * @param string token
 * @return mixed
 */
Games.prototype.getAdversary = function (game, token) {
    for (var user in this.games[game].users) {
        var current = this.games[game].users[user];

        if (current.getToken() != token)
            return current;
    }

    return false;
};

/**
 * Get user color
 * @param  string token
 * @return string
 */
Games.prototype.getUserColor = function (game, token) {
    var i = 0;

    for (var user in this.games[game].users) {
        var current = this.games[game].users[user];
        i++;

        if (current.getToken() == token)
            return (i === 1) ? 'black' : 'white';
    }

    return false;
}


module.exports = Games;
