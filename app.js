var io = require('socket.io')(process.env.PORT || 8080);
global.outputs = require('./lib/outputs.js');
var ClustersModel = require('./src/models/clusters.js');
var Games = require('./src/models/games.js');
global.players = require('./src/models/players.js');


/**************/
/** CLUSTERS **/
/**************/
var normalCluster = new ClustersModel();

// Normal mode cluster
normalCluster.add('private');
normalCluster.addTo('private', new Games());
normalCluster.add('public');
normalCluster.addTo('public', new Games());

global.clusters = {
    normal: normalCluster
};


/*****************/
/** CONTROLLERS **/
/*****************/
global.controllers = {
    game: require('./src/controllers/game.js'),
    intersections: require('./src/controllers/intersections.js'),
    nodeDetection: require('./src/controllers/nodeDetection.js')
};


/************/
/** EVENTS **/
/************/
global.events = {
    search: require('./src/events/search.js')
};


/***************/
/** LISTENING **/
/***************/
io.on('connection', function (socket) {

    // When a player is looking for a public game
    socket.on('search:normal', function (infos) {
        global.events.search.normal(socket, infos);
    });

    // When a player join a private game
    socket.on('search:join', function (infos) {
        global.events.search.join(socket, infos);
    });

    // When a player cancel
    socket.on('search:cancel', function () {
        global.events.search.leave(socket);
    });


    // When a player make a move
    socket.on('game:move', function (move) {
      global.events.game.move(socket, move);
    });

    // When a player give up
    socket.on('game:giveup', function () {
      global.events.game.giveUp(socket);
    });

    // When a player skip his turn
    socket.on('game:skip', function () {
      global.events.game.skip(socket);
    });


    // When a user leave a game
    socket.on('disconnect', function () {
        global.events.search.leave(socket);
    });

});
