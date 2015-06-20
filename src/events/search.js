var User = require('../models/user.js');
var Search = {};


/**
 * Search an available Cluster in normal
 */
Search.normal = function (socket, infos) {
    infos = JSON.parse(infos);

    var token = infos.token;
    var games = global.clusters.normal.get('public');
    var chosenGame = games.getAvailable();
    var currentUser = new User(token, socket, infos);

    if (!chosenGame) {
        chosenGame = games.add();
    }

    this.startGame('public', chosenGame, currentUser);
    console.log(infos.username +' rejoint la partie '+ chosenGame);
};


/**
 * When an user join a private game
 */
Search.join = function (socket, infos) {
    infos = JSON.parse(infos);

    var game = infos.game;
    var userInfos = infos.user;
    var token = userInfos.token;
    var games = global.clusters.normal.get('private');
    var chosenGame = games.exists(game);
    var currentUser = new User(token, socket, userInfos);

    if (!chosenGame) {
        currentUser.getSocket().emit('search:error', "La partie n'existe pas");
        return;
    }

    this.startGame('private', chosenGame, currentUser);
};


/**
 * When a user disconnect
 */
Search.leave = function (socket) {
    var userGame = global.players.get(socket.id);
    var games = null;

    if (!userGame)
        return;

    // Detect if the user game is private or public
    if (userGame.type === 'private') {
        games = global.clusters.normal.get('private');
    } else {
        games = global.clusters.normal.get('public');
    }

    // Verify if the game exists
    var currentGame = games.get(userGame.game);

    console.log('Quitte la partie '+ currentGame);

    if (!currentGame)
        return;

    // Disconnect every players in the game
    for (var user in currentGame.getUsers()) {
        var currentUser = currentGame.getUsers()[user];
        global.players.delete(currentUser.getSocket().id);

        if (currentUser.getSocket().id != socket.id)
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
Search.startGame = function (type, chosenGame, currentUser) {
    var games = global.clusters.normal.get(type);

    games.addUser(chosenGame, currentUser);

    // Determine event to send
    if (games.countUsers(chosenGame) === 2) {
        var adversary = games.getAdversary(chosenGame, currentUser.getToken());

        // Notify both players
        currentUser.getSocket().emit('search:found', JSON.stringify({
            gameIdentifier: chosenGame,
            adversary: adversary.getAll()
        }));
        adversary.getSocket().emit('search:found', JSON.stringify({
            gameIdentifier: chosenGame,
            adversary: currentUser.getAll()
        }));

        // Add both players to playersModel
        global.players.add(currentUser.getSocket().id, chosenGame, type);
        global.players.add(adversary.getSocket().id, chosenGame, type);

        return;
    }
};


module.exports = Search;
