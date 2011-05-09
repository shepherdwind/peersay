define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        $        = require('libs/jquery');

    module.exports = Backbone.Model.extend({
        url : function() {
            var base = 'index.php/answers/edit';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        }
    });
});

