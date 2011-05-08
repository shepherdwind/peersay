define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        Test     = require('app/models/test');

    module.exports = Backbone.Collection.extend({
        model  : Test,
        url    : 'index.php/tests/lists'
    });
});
