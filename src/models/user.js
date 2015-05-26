var User = function (username, id, level) {
    this.username = username;
    this.id = id;
    this.level = level;
};

User.prototype.getUsername = function () {
    return this.username;
}


module.exports = User;
