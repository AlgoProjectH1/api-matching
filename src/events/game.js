var Game = {};


/**
 * When a user make a move on the game
 * @param object move {x, y}
 */
Game.play = function (socket, move) {
    move = JSON.parse(move);
    var games = null;
    var userGame = global.players.get(socket.id);

    if (!userGame)
        return;

    // Detect if the user game is private or public
    if (userGame.type === 'private') {
        games = global.clusters.normal.get('private');
    } else {
        games = global.clusters.normal.get('public');
    }

    var userInfos = games.getUserFromSocket(userGame.game, socket.id);
    var gameController = games.getGameController(userGame.game);
    var userColor = (games.getUserColor(userGame.game, userInfos.getToken()) == 'black') ? 1 : 2;


    // Verify if it's the user turn to play
    if (gameController.currentPlayer != userColor) {
        global.outputs.game(userGame.game, userInfos.getUsername() +" not your turn");
        return;
    }

    // Verify if the player can move here
    if (gameController.Intersections.get(move.x, move.y) !== 0) {
        global.outputs.game(userGame.game, userInfos.getUsername() +" cant play on ["+ move.x +", "+ move.y +"]");
        return;
    }

    global.outputs.game(userGame.game, userInfos.getUsername() +" moves ["+ move.x +", "+ move.y +"]");

    // Move and switch turn
    gameController.Intersections.set({x: move.x, y: move.y}, userColor);
    gameController.setSkipped(false);
    gameController.switchPlayer();

    // Calcul new goban for each player
    for (var player = 1; player <= 2; player++) {
        var nodeController = new global.controllers.nodeDetection(player, gameController.Intersections.get());
        var nodes = nodeController.getNodes();

        gameController.verifyNodesToDie(nodes, player);
    }

    // Send new goban to each player
    for (var user in games.getUsers(userGame.game)) {
        var currentUser = games.getUsers(userGame.game)[user];

        currentUser.getSocket().emit('game:refresh', JSON.stringify({
            goban: gameController.Intersections.get(),
            captures: gameController.captures,
            next: gameController.currentPlayer,
            move: move
        }));
    }
};


/**
 * When a user skip his turn
 */
Game.skip = function (socket) {
    var games = null;
    var userGame = global.players.get(socket.id);

    if (!userGame) {
        console.log(userGame);
        return;
    }

    // Detect if the user game is private or public
    if (userGame.type === 'private') {
        games = global.clusters.normal.get('private');
    } else {
        games = global.clusters.normal.get('public');
    }

    var userInfos = games.getUserFromSocket(userGame.game, socket.id);
    var gameController = games.getGameController(userGame.game);
    var userColor = (games.getUserColor(userGame.game, userInfos.getToken()) == 'black') ? 1 : 2;


    // Verify if it's the user turn to play
    if (gameController.currentPlayer != userColor) {
        global.outputs.game(userGame.game, userInfos.getUsername() +" not your turn");
        return;
    }

    global.outputs.game(userGame.game, userInfos.getUsername() +" skipped");

    // If the other player already skipped
    if (gameController.skipped === true) {
        // End of game
        var scores = gameController.countPoints();

        global.outputs.game(userGame.game, "scores: "+ scores[1] +" – "+ scores[2]);
        global.outputs.game(userGame.game, "end of game");

        // Send end of game
        for (var user in games.getUsers(userGame.game)) {
            var currentUser = games.getUsers(userGame.game)[user];

            currentUser.getSocket().emit('game:end', JSON.stringify({
                scores: scores
            }));
        }

        // Delete the game
        games.delete(userGame.game);
        global.outputs.game(userGame.game, 'deleted');

        return;
    }

    gameController.setSkipped(true);
    gameController.switchPlayer();

    var adversary = games.getAdversary(userGame.game, userInfos.getToken());

    // Send event to adversary
    adversary.getSocket().emit('game:skipped', JSON.stringify({
        next: gameController.currentPlayer
    }));
};



module.exports = Game;
