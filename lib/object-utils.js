
/**
 * _.map({a:1, b:2, c:3}, function (key, value, obj) {
 *  return key + '=' + val;
 * });
 */
exports.forEach = function (obj, iterator) {
   var isObj = obj instanceof Object,
       arr = isObj ? Object.keys(obj): (obj || []);
   arr.forEach(function (k) {
      iterator(k, obj[k], obj);
   });
}
