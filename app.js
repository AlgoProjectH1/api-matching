var io = require('socket.io')(8080);
var search = require('./src/controllers/search.js');
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


/***************/
/** LISTENING **/
/***************/
io.on('connection', function (socket) {

    // When a player is looking for a public game
    socket.on('search:normal', function (user) {
        global.events.search.normal(socket, user);
    });

});
