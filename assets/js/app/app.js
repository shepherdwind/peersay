define(function(require,exports, module){
//此模块应该重构为App View

    var config   = require('app/conf/config'),
        $        = require('libs/jqueryui'),
        Mustache = require('libs/mustache'),
        Busy     = require('libs/busy'),
        Backbone = require('libs/backbone'),
        User     = require("app/models/user"),
        content  = $('#wrap');

    module.exports = Backbone.View.extend({
        
        events : {
            "click .reset" : 'reset',
            "click .submit": 'login'
        },
        initialize : function () {
            this.render();
        },
        reset      : function () {
            this.$("form")[0].reset();
            return false;
        },
        render :  function () {
            var self    = this;
            var content = $("#wrap");
            $.ajax({
                url      : 'assets/views/research.html',
                success  : function (data) {
                    var html  = Mustache.to_html(data, config);
                    $(self.el).html(html);
                    content.html(self.el);
                    content.find('#top-nav a, .button a').button();
                },
                dataType : 'html'
            });
        },
        login       : function ( ) {
            var self = this,
                data = {
                    name     : $("#uName").val(),
                    password : $("#uPassword").val()
                };
            this.onloading();

            $.post("index.php/users/login", data, function (response) {
                console.log(arguments);
                if(response.success) {
                    //如果是研究员，查看自己的列表
                    var user        = new User(response.model);
                    var uType       = user.get('uType');
                    var controllers = [];
                    var filter      = [];
                    if( uType == 'research' ) {
                        controllers = ['app/controllers/test', 'app/controllers/topic', 'app/controllers/user'];
                        module.load(controllers, function ( Tester, Topicer, User) {
                            var test = new Tester();
                            new Topicer();
                            new User();
                            Backbone.history.start();
                            Backbone.history.saveLocation("tests/lists/");
                            test.listTests();
                        });
                    } else if ( uType == 'messenger' ) {
                        filter = [];
                    } else {
                        controllers = ['app/controllers/answer'];
                        module.load(controllers, function (Answer) {
                            var an = new Answer();
                            Backbone.history.start();
                            an.answer();
                            Backbone.history.saveLocation("answer/");
                        });
                    }
                    Backbone.emulateHTTP = true;
                    Backbone.emulateJSON = true;

                }

                self.trigger('loaded');
            }, 'json');
        },
        /**
         *
         * 控制加载状态提示
         * @param node HTMLDOM the node show the loading images
         * @param event String 加载完成的事件
         * @param obj   Object 绑定事件的对象
         */
        onloading : function (node, event, obj) {
            node = node || document.body;
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
