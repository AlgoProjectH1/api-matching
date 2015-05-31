var User = require('../models/user.js');
var Search = {};

/**
 * Search an available Cluster in normal
 */
Search.normal = function (socket, user) {
    var games = global.clusters.normal.get('public');
    var chosenGame = games.getAvailable();

    if (!chosenGame) {
        chosenGame = games.add();
    }

    games.addUser(chosenGame, new User(user, 1));

    res.send(JSON.stringify({
        users: games.getUsers(chosenGame),
        game: chosenGame
    }));
};

/**
 * Search an available Cluster in go+
 */
Search.goPlus = function (req, res) {

};


module.exports = Search;
