define(function(require,exports, module){
    
    var Backbone = require('libs/backbone'),
        Answer     = require('app/models/answer');

    module.exports = Backbone.Collection.extend({
        model  : Answer,
        url    : 'index.php/answers/lists'
    });
});
