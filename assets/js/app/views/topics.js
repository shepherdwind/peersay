define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        $          = require('libs/jqueryui'),
        Mustache   = require('libs/mustache'),
        Busy       = require('libs/busy'),
        Topic      = require('app/models/topic');

     module.exports    = Backbone.View.extend({
        events    : {
            'click .del' : "del"
        },
        initialize : function () {
            //_.bindAll(this,'render');
            //this.model.bind('change', this.render);
            //this.render();
        },
        del        : function (e) {
            var id    = $(e.target).attr('data-id'),
                json  = { message : '确定删除'},
                self  = this;

            json.buttons = [{
                text  : "确定删除",
                click : function () {
                    $(this).dialog('close');
                    self._delete(id);
                }
            },
            {
                text  : "取消",
                click : function () {
                    $(this).dialog('close');
                }
            }];
            self._tips('confirm',json);
            return false;

        },
        render     : function () {
            var self  = this,
                url   = 'assets/views/listTopics.html',
                content = $("#main-wrap");

            //显示加载状态

            //加载view
            $.get( url, function (data) {
                var config = { collection : self.collection.toJSON() };
                $(self.el).html( Mustache.to_html(data, { collection : self.collection.toJSON() }) ).find("tfoot a").button();
                content.html(self.el);
                //触发加载完成事件
                self.trigger('loaded');
            });
        },
        _delete   : function (id) {
            var self  = this,
                model = new Topic({ id : id });

            model.destroy({
                success : function () {
                    $(self.el).find(".test-item-" + id).animate({ opacity: 0}, 300, function () {
                        $(this).remove();
                    });
                }
            });
        },
        /**
         *
         * 控制加载状态提示
         * @param node HTMLDOM the node show the loading images
         * @param event String 加载完成的事件
         * @param obj   Object 绑定事件的对象
         */
        onloading : function (node, event, obj) {
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
                if (type in tip)
                    tip[type](message);

                tip = undefined;
            });
        }

    });
});
