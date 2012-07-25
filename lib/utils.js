/**
 * User: ramon
 * Date: 7/22/12 7:11 PM
 */

exports.randomInt = function(max) {
    return Math.floor((Math.random() * max));
};

exports.isFunction = function(fn) {
    return typeof(fn) === 'function';
}
