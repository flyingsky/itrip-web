var assert = require("assert");
var objUtil = require("../lib/object-utils");


describe('Object each', function(){
    it('should iterate each property of object {name: "simon", location:"SH"}', function() {
       var obj = {name: "simon", location:"SH"},
           keys = [],
           values = [];
       objUtil.forEach(obj, function (key, value) {
          keys.push(key);
          values.push(value);
       });
       assert.equal(0, keys.indexOf("name"));
       assert.equal(1, keys.indexOf("location"));
       assert.equal(0, values.indexOf("simon"));
       assert.equal(1, values.indexOf("SH"));
    });
});
