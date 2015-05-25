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

module.exports = outputs;
