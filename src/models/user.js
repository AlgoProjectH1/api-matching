var User = function (id, level) {
    this.id = id;
    this.level = level;
};

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
