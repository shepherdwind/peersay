define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        $          = require('libs/jqueryui'),
        Busy       = require('libs/busy'),
        Mustache   = require('libs/mustache');
        //Test       = require('app/models/test.js'),
        //TestList   = require('app/models/tests.js');

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
                url   = 'assets/views/addTest.html',
                content = $("#main-wrap");

            //显示加载状态
            this._dealLoad(content[0], 'addViewLoad');

            //加载view
            $.get( url, function (data) {
                $(self.el).html(Mustache.to_html(data, self.model.toJSON() ) );
                self.$(".button a").button();
                content.html(self.el);
                module.load('libs/ckeditor/ckeditor',function () {
                    CKEDITOR.replace("tDescribe");
                }); 
                self.trigger('addViewLoad');
            });
        },
        /**
         *
         * 增加测试，表单提交时触发此函数
         */
        save      : function () {
            var self = this;
            this._dealLoad(self.el,'saveTest');
            var tDescribe = '';
            if(CKEDITOR) {
                tDescribe = CKEDITOR.instances.tDescribe.getData();
            }

            var data = {
                tTitle    : this.$('[name=tTitle]').val(),
                tDescribe : tDescribe || this.$('[name=tDescribe]').val()
            };

            var message = this.model.isNew() ? "成功创建测试" : "修改成功";
            this.model.save(data,
            {
                success   : function () {
                    var json = {};
                    json.message = message;

                    json.buttons = [{
                        text   : '好了,就这样吧',
                        click  : function () { 
                            $(this).dialog("close");
                            CKEDITOR && CKEDITOR.instances['tDescribe'].destroy();
                            self.trigger('testSaved','tests/lists');
                        }
                    },
                    {
                        text   : '继续修改',
                        click : function () {
                            $(this).dialog("close");
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
