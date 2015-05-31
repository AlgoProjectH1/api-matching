var io = require('socket.io')(process.env.PORT || 8080);
var ClustersModel = require('./src/models/clusters.js');
var Games = require('./src/models/games.js');


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
    socket.on('search:normal', function (token) {
        global.events.search.normal(socket, token);
    });

    // When a player join a private game
    socket.on('search:join', function (game) {
        global.events.search.join(socket, game);
    });

});
