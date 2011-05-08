define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        $        = require('libs/jquery');

    module.exports = Backbone.Model.extend({
        defaults : {
            tDescribe : '',
            tTitle    : ''
        },
        validate   : function (attr) {
            if($.trim(attr.tTitle) === '' || attr.tTitle === this.defaults.tTitle) {
                return '测试标题不能为空';
            }
        },
        url : function() {
            var base = 'index.php/tests/edit';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        }
    });
});
