define(function(require,exports, module){
    
    var Backbone = require('libs/backbone'),
        Topic    = require('app/models/topic');

    module.exports = Backbone.Collection.extend({
        model  : Topic,
        url    : 'index.php/topics/lists'
    });
});
