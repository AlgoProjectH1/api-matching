var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var app = express();


// Config app
app.use(methodOverride());
app.use(bodyParser());


// Clusters
var ClustersModel = require('./src/models/clusters.js');
var globalClusters = new ClustersModel();

// Normal mode cluster
globalClusters.add('normal');
globalClusters.addTo('normal', 'private', new ClustersModel());
globalClusters.addTo('normal', 'public',  new ClustersModel());


// Launch app
app.listen(1337);
