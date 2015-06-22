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

    if (gameController.Intersections.get(move.x, move.y) !== 0) {
        global.outputs.game(userGame.game, userInfos.getUsername() +" cant play on ["+ move.x +", "+ move.y +"]");
        return;
    }

    global.outputs.game(userGame.game, userInfos.getUsername() +" moves ["+ move.x +", "+ move.y +"]");

    gameController.Intersections.set({x: move.x, y: move.y}, userColor);
    gameController.switchPlayer();

    // Calcul new goban
    // Send new goban to each players
};

/**
 * When a user give up the current game
 */
Game.giveUp = function (socket) {

};

/**
 * When a user skip his turn
 */
Game.skip = function (socket) {

};


module.exports = Game;
