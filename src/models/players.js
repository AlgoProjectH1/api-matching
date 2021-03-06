var Players = {
    users: {}
};


/**
 * Add an user
 * @param string socketID
 * @param string gameID
 * @param string type
 */
Players.add = function (socketID, gameID, type) {
    this.users[socketID] = {
        game: gameID,
        type: type
    };
};


/**
 * Get an user
 * @param string socketID
 * @return mixed
 */
Players.get = function (socketID) {
    return (this.users[socketID]) ? this.users[socketID] : false;
};


/**
 * Delete an user
 * @param string socketID
 */
Players.delete = function (socketID) {
    delete this.users[socketID];
};


module.exports = Players;
