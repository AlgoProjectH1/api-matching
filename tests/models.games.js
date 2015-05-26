var assert = require('assert');

var Game = require('../src/models/games.js');
var User = require('../src/models/user.js');


describe('Games', function() {
    var games = new Game();
    var gameID = games.add();

    var userInfos = new User('Romain', 10, 2);
    games.addUser(gameID, userInfos);

    describe('#addUser()', function() {
        it('should add a user to a games', function() {
            assert.equal(1, games.countUsers(gameID));
        })
    })

    describe('#getUsers()', function() {
        it('should get users from a game', function() {
            assert.equal("Romain", games.getUsers(gameID)[0].getUsername());
        })
    })
})
