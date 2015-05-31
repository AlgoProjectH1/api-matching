var User = function (token, socket) {
    this.token = token;
    this.socket = socket;
};

/**
 * Get the token
 * @return int
 */
User.prototype.getToken = function () {
    return this.token;
}

/**
 * Get the socket object
 * @return object
 */
User.prototype.getSocket = function () {
    return this.socket;
};


module.exports = User;
