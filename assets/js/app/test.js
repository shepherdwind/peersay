define(function(require,exports){
    
    var Mustache = require('libs/mustache'),
        _        = require('libs/underscore'),
        $        = require('libs/jquery'),
        Backbone = require('libs/backbone');

    var Test     = Backbone.Model.extend({
            defaults : {
                tDescribe : '测验描述',
                tTitle    : '测验标题'
            },
            initialize : function () {
                if ( ! this.get('tTitle') ) {
                    this.set( this.defaults );
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
                this.model.view  = this;
            },
            render     : function () {
                $(this.el).html(Mustache.to_html(this.model.toJSON(), this.template));
            },
            del        : function () {
            },
            edit       : function () {
            }
        });

    exports.Test = Test;
    exports.TestList = TestList;
    exports.TestView = TestView;

});
