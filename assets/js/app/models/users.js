define(function(require,exports, module){
    
    var Backbone = require('libs/backbone'),
        User     = require('app/models/user');

    module.exports = Backbone.Collection.extend({
        model  : User,
        url    : 'index.php/users/lists'
    });
});
