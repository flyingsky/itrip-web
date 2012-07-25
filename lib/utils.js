/**
 * User: ramon
 * Date: 7/22/12 7:11 PM
 */

exports.randomInt = function(max) {
    return Math.floor((Math.random() * max));
};

exports.parseInt = function(intStr, defaultValue) {
   var result = parseInt(intStr);
   if (defaultValue !== null && defaultValue !== undefined && isNaN(result)) {
      return defaultValue
   } else {
      return result;
   }
}

exports.isFunction = function(fn) {
    return typeof(fn) === 'function';
}
