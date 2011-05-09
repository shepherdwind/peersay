define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        $        = require('libs/jquery');

    module.exports = Backbone.Model.extend({
        defaults : {
            tocTitle  : '',
            tocMax    : 3,
            tocMin    : 1
        },
        validate   : function (attr) {
            if($.trim(attr.tocTitle) === '') {
                return '项目标题不能为空';
            } else if ( attr.tocMin > attr.tocMax ) {
                return '请确保项目数填写的多数数字并且，最少项目数' + attr.tocMin + '不应该大于最多项目数' + attr.tocMax;
            }
        },
        url : function() {
            var base = 'index.php/topics/edit';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        }
    });
});
