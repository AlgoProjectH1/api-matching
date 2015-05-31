var Search = {};

/**
 * Search an available Cluster in normal
 * /normal/search
 */
Search.normal = function (req, res) {
    var user = req.body.user;
    var cluster = req.app.get('normalCluster');
    var availableClusters = cluster.getAvailable('public');
    var chosenCluster = null;

    if (availableClusters.length === 0) {
        chosenCluster = cluster.addTo('public', [user]);
    } else {
        chosenCluster = availableClusters[0];
        var users = cluster.getFrom('public', chosenCluster);
        users.push(user);

        cluster.addTo('public', chosenCluster, users);
    }

    res.send(JSON.stringify({
        'users': cluster.getFrom('public', chosenCluster),
        'cluster': chosenCluster
    }));
};

/**
 * Search an available Cluster in go+
 * /normal/search
 */
Search.goPlus = function (req, res) {

};


module.exports = Search;
