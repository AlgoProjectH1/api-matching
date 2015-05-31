var Clusters = function () {
    this.clusters = {};
};


/**
 * Add a cluster
 * @param string clusterName
 */
Clusters.prototype.add = function (clusterName) {
    this.clusters[clusterName] = [];
};


/**
 * Add a row in a cluster
 * @param string clusterName
 * @param mixed key
 * @param mixed value
 */
Clusters.prototype.addTo = function (clusterName, key, value) {
    if (!value) {
        this.clusters[clusterName] = key;
        return;
    }

    this.clusters[clusterName][key] = value;
};


/**
 * Get available cluster rows
 * @param string clusterName
 */
Clusters.prototype.getAvailable = function (clusterName) {
    var clusters = [];

    for (cluster in this.clusters[clusterName]) {
        var current = this.clusters[clusterName][cluster];

        if (current instanceof Array && current.length < 2)
            clusters.push(cluster);
    }

    return clusters;
};


/**
 * Get rows of a cluster
 * @param string clusterName
 * @return object
 */
Clusters.prototype.get = function (clusterName) {
    return this.clusters[clusterName];
};


/**
 * Get a row of a cluster
 * @param string clusterName
 * @return mixed
 */
Clusters.prototype.getFrom = function (clusterName, key) {
    return this.get(clusterName)[key];
};


module.exports = Clusters;
