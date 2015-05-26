var User = function (username, id, level) {
    this.username = username;
    this.id = id;
    this.level = level;
};

/**
 * Get the username
 * @return string
 */
User.prototype.getUsername = function () {
    return this.username;
}

/**
 * Get the id
 * @return int
 */
User.prototype.getId = function () {
    return this.id;
}

/**
 * Get the level
 * @return int
 */
User.prototype.getLevel = function () {
    return this.level;
}


module.exports = User;
