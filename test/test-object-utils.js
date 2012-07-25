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
	keys.indexOf("name").should.equal(0);
	keys.indexOf("location").should.equal(1);
	values.indexOf("simon").should.equal(0);
	values.indexOf("SH").should.equal(1);
    });
});
