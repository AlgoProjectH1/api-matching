var colors = require('colors');
var outputs = {};

/**
 * Display a success message in console
 * @param string message
 */
outputs.success = function (message) {
    this.write(message.inverse.green);
};

/**
 * Display an error message in console
 * @param string message
 */
outputs.error = function (message) {
    this.write(message.inverse.red);
};

/**
 * Display a message in console
 * @param string message
 */
outputs.write = function (message) {
    console.log(message);
};

/**
 * Log a game state in console
 * @param string game
 * @param string message
 */
outputs.game = function (game, message) {
    var d = new Date();
    console.log("["+ (d.toLocaleTimeString()).grey +"]["+ (game).inverse.green +"] "+ message);
};

module.exports = outputs;
