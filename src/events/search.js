var User = require('../models/user.js');
var Search = {};


/**
 * Search an available Cluster in normal
 */
Search.normal = function (socket, token) {
    var games = global.clusters.normal.get('public');
    var chosenGame = games.getAvailable();
    var currentUser = new User(token, socket);

    if (!chosenGame) {
        chosenGame = games.add();
    }

    this.startGame(games, chosenGame, currentUser);
};


/**
 * Search an available Cluster in go+
 */
Search.goPlus = function (socket) {

};


/**
 * When an user join a private game
 */
Search.join = function (socket, infos) {
    var game = infos.game;
    var token = infos.token;
    var games = global.clusters.normal.get('private');
    var chosenGame = games.exists(game);
    var currentUser = new User(token, socket);

    if (!chosenGame) {
        currentUser.getSocket().emit('search:error', "La partie n'existe pas");
        return;
    }

    this.startGame(games, chosenGame, currentUser);
};


/**
 * When a user disconnect
 */
Search.leave = function (socket) {
    var userGame = global.users.getGameFrom(socket.id);

    if (!userGame)
        return;

    if (userGame.type === 'private') {
        var games = global.clusters.normal.get('private');
    } else {
        var games = global.clusters.normal.get('public');
    }

    var currentGame = games.get(userGame.id);

    if (!currentGame)
        return;

    for (var user in currentGame.getUsers()) {
        var currentUser = currentGame.getUsers()[user];

        currentUser.getSocket().emit('game:disconnect');
    }

    // Delete the game
    games.delete(userGame.id);
};


/**
 * Start a game
 * @param object games
 * @param string chosenGame
 * @param object currentUser
 */
Search.startGame = function (games, chosenGame, currentUser) {
    games.addUser(chosenGame, currentUser);

    // Determine event to send
    if (games.countUsers(chosenGame) === 2) {
        var adversary = games.getAdversary(chosenGame, currentUser.getToken());

        currentUser.getSocket().emit('game:starts', chosenGame);
        adversary.getSocket().emit('game:starts', chosenGame);

        return;
    }

    currentUser.getSocket().emit('game:waiting');
};


module.exports = Search;
