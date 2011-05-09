define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        $        = require('libs/jquery');

    module.exports = Backbone.Model.extend({
        defaults : {
            uName     : '',
            uType     : 'student',
            uTypes    : [
                { type  : 'student', checked: true , label: '被试/学生' },
                { type  : 'research', checked: false, label: '研究者' },
                { type  : 'admin', checked: false, label: '管理员' },
                { type  : 'messenger', checked: false, label: '信息员' }
            ],
            isEdit    : false
        },
        validate   : function (attr) {
            if($.trim(attr.uName) === '') {
                return '姓名不能为空';
            } else if ( 'passRepeat' in attr && attr.uPassword !== attr.passRepeat ) {
                return '两次输入密码不一致，请重新输入';
            }
        },
        url : function() {
            var base = 'index.php/users/edit';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        }
    });
});
