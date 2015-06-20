var User = function (token, socket, infos) {
    this.token = token;
    this.socket = socket;
    this.infos = {
        username: infos.username,
        rank: infos.rank,
        picture: infos.picture
    };
};

/**
 * Get the token
 * @return string
 */
User.prototype.getToken = function () {
    return this.token;
};

/**
 * Get the username
 * @return string
 */
User.prototype.getUsername = function () {
    return this.getAll().username;
};

/**
 * Get the picture
 * @return string
 */
User.prototype.getPicture = function () {
    return this.getAll().picture;
};

/**
 * Get the rank
 * @return int
 */
User.prototype.getRank = function () {
    return this.getAll().rank;
};

/**
 * Get all the interesting informations
 * @return object
 */
User.prototype.getAll = function () {
    return this.infos;
};

/**
 * Get the socket object
 * @return object
 */
User.prototype.getSocket = function () {
    return this.socket;
};


module.exports = User;
