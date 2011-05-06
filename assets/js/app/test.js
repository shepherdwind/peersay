;
define(function(require,exports){
    var Mustache = require('libs/mustache'),
        _        = require('libs/underscore'),
        $        = require('libs/jquery'),
        Backbone = require('libs/backbone');

    var Test     = Backbone.Model.extend({
            default : {
                tDescribe : '测验描述',
                tTitle    : '测验标题'
            },
            initialize: function () {
                if ( !this.get('tTitle') ) {
                    this.set(this.default);
                }
            }

        }),
       
        TestList = Backbone.Collection.extend({
            model: Test
        }),
        
        TestView = Backbone.View.extend({
            tagName  : 'li',
            template : '<span class="tTitle">{{tTitle}}</span> <span class="tDescribe">{{tDescribe}}</span> <span class="del">删除</span>',
            events   : {
                "click .del"       : "delete",
                "dbclick"          : 'edit'
            },
            initialize : function () {
                _.bindAll( this, 'render', 'delete' );
                this.model.bind('change', this.render);
            },
            render     : function () {
                $(this.el).html(Mustache.to_html(this.model.toJSON(), this.template));
            },
            delete     : function () {
                console.log(arguments);
            },
            edit       : function () {
                console.log(arguments);
            }
        });

    Backbone.sync = function () {
        console.log(arguments);
    };
    var test1 = new Test({
        'tTitle' : '测试'
    });
    exports.tests = new TestList;
    test1.save();
});
