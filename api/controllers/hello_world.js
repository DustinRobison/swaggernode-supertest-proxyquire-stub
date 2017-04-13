'use strict';
let helloHelper = require('../helpers/hello_helper');

var util = require('util');

module.exports = {
  hello: hello
};
function hello(req, res) {

  var name = req.swagger.params.name.value || helloHelper.getName();
  var hello = util.format('%s, %s!', helloHelper.getGreeting(), name);

  res.json(hello);
}
