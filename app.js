var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var search = require('./src/controllers/search.js');
var app = express();


// Config app
app.use(methodOverride());
app.use(bodyParser());


// Clusters
var ClustersModel = require('./src/models/clusters.js');
var normalCluster = new ClustersModel();

// Normal mode cluster
normalCluster.add('private');
normalCluster.add('public');
app.set('normalCluster', normalCluster);


// Routes
app.post('/normal/search', search.normal);


// Launch app
app.listen(1337);
