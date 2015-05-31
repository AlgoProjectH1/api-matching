var User = require('../models/user.js');
var Search = {};

/**
 * Search an available Cluster in normal
 */
Search.normal = function (socket, token) {
    var games = global.clusters.normal.get('public');
    var chosenGame = games.getAvailable();
    var state = 0;
    var currentUser = new User(token, socket);

    if (!chosenGame) {
        chosenGame = games.add();
    }

    games.addUser(chosenGame, currentUser);

    // Determine event to send
    if (games.countUsers(chosenGame) === 2) {
        var adversary = games.getAdversary(chosenGame, token);

        currentUser.getSocket().emit('game:starts', chosenGame);
        adversary.getSocket().emit('game:starts', chosenGame);

        return;
    }

    currentUser.getSocket().emit('search:waiting');
};

/**
 * Search an available Cluster in go+
 */
Search.goPlus = function (req, res) {

};


module.exports = Search;
