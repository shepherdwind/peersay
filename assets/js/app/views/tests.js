define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        $          = require('libs/jqueryui'),
        Mustache   = require('libs/Mustache'),
        Busy       = require('libs/busy');

     module.exports    = Backbone.View.extend({
        events    : {
        },
        initialize : function () {
            //_.bindAll(this,'render');
            //this.model.bind('change', this.render);
            this.render();
        },
        render     : function () {
            var self  = this,
                url   = 'assets/views/listTests.html',
                content = $("#main-wrap");

            //显示加载状态
            this._dealLoad(content[0], 'listTests');

            //加载view
            $.get( url, function (data) {
                var config = { collection : self.collection.toJSON() };
                console.log(config);
                $(self.el).html( Mustache.to_html(data, { collection : self.collection.toJSON() }) ).find('.accordion').accordion({ header: "h3"});
                content.html(self.el);
                self.trigger('listTests');
            });
        },
        /**
         *
         * 控制加载状态提示
         * @param node HTMLDOM the node show the loading images
         * @param event String 加载完成的事件
         * @param obj   Object 绑定事件的对象
         */
        _dealLoad : function (node, event, obj) {
            var loading = Busy(node);

            obj = obj || this;
            obj.bind(event, function () {
                loading.remove();
            });
        },
        _tips     : function (type, message) {
            var self = this;
            module.load('app/tips', function (Tips) {
                var tip = new Tips({'position': ['center',100]});
                self.trigger("saveTest");
                if( type === 'error' )
                    tip.error(message);
                else
                    tip.success(message);

                tip = undefined;
            });
        }

    });
});
