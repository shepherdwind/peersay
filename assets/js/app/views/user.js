define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        $          = require('libs/jqueryui'),
        Busy       = require('libs/busy'),
        Mustache   = require('libs/mustache');

     module.exports    = Backbone.View.extend({
        events    : {
            "click .submit" : "save",
            "click .reset"  : "reset"
        },
        initialize : function () {
            //_.bindAll(this,'render');
            //this.model.bind('change', this.render);
            this.render();
        },
        reset      : function () {
            this.$("form")[0].reset();
            return false;
        },
        render     : function () {
            var self  = this,
                url   = 'assets/views/editUser.html',
                content = $("#main-wrap");

            //显示加载状态
            this.onloading(content[0], 'loaded');

            //加载view
            $.get( url, function (data) {
                $(self.el).html(Mustache.to_html(data, self.model.toJSON() ) );
                self.$(".button a").button();
                self.$("#u-type").buttonset();
                content.html(self.el);
                self.trigger('loaded');
            });
        },
        /**
         *
         * 增加测试，表单提交时触发此函数
         */
        save      : function () {
            var self = this;
            //开始显示加载状态
            this.onloading(self.el);

            var data = {
                uName     : this.$('#uName').val() ,
                uStudId   : parseInt(this.$('#uStudId').val(), 10 ) ,
                uPassword : this.$('#uPassword').val(),
                uType     : this.$("#u-type .ui-state-active").attr("data-type"),
                passRepeat: this.$('#passRepeat').val()
            };

            var message = this.model.isNew() ? "成功创建项目" : "修改成功";
            this.model.save(data,
            {
                success   : function () {
                    var json = {};
                    json.message = message;

                    json.buttons = [{
                        text   : '好了,就这样吧',
                        click  : function () { 
                            $(this).dialog("close");
                            self.trigger('saved','users/lists');
                        }
                    },
                    {
                        text   : '添加新项目',
                        click : function () {
                            $(this).dialog("close");
                            self.trigger('saved','users/addNew');
                        }
                    }];

                    self._tips('success', json);
                },
                error     : function (model,error) {
                    self._tips('error', error );
                }
            });

            return false;
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
            event = event || 'loaded';

            obj.bind(event, function () {
                loading.remove();
            });
        },
        _tips     : function (type, message) {
            var self = this;
            module.load('app/tips', function (Tips) {
                var tip = new Tips({'position': ['center',100]});

                //结束加载状态
                self.trigger("loaded");
                if( type in tip )
                    tip[type](message);

                tip = undefined;
            });
        }

    });
});
