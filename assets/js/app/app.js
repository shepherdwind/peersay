define(function(require,exports, module){
//此模块应该重构为App View

    var config   = require('app/conf/config'),
        $        = require('libs/jqueryui'),
        Mustache = require('libs/mustache'),
        Busy     = require('libs/busy'),
        Backbone = require('libs/backbone'),
        User     = require("app/models/user"),
        content  = $('#wrap');

    var App      = Backbone.View.extend({
        
        events : {
            "click .reset" : 'reset',
            "click .submit": 'login'
        },
        reset      : function () {
            this.$("form")[0].reset();
            return false;
        },
        initialize : function () {

            //solve the problem when JSON is undefined(IE7)
            try {
                JSON;
            } catch (e) {
                module.load('libs/json');
            }
            this.render();
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
                    var cookie = document.cookie;

                    if( cookie.indexOf('student') > -1 ) {
                        self._goToPage("student");
                    } else if( cookie.indexOf('research') > -1) {
                        self._goToPage("research");
                    }
                },
                dataType : 'html'
            });
            Backbone.emulateHTTP = true;
            Backbone.emulateJSON = true;
        },
        login       : function ( ) {
            var self = this,
                data = {
                    name     : $("#uName").val(),
                    password : $("#uPassword").val()
                };
            this.onloading();

            $.post("index.php/users/login", data, function (response) {
                if(response.success) {
                    //如果是研究员，查看自己的列表
                    var user        = new User(response.model);
                    var uType       = user.get('uType');
                    var filter      = [];
                    if( uType == 'research' ) {
                        self._goToPage('research');
                    } else if ( uType == 'messenger' ) {
                        filter = [];
                    } else {
                        self._goToPage('student');
                    }
                }

                self.trigger('loaded');
            }, 'json');
        },
        _goToPage : function (type) {
            type = type || 'research';
            var controllers = [];
            var url         = document.location.hash;
            if( type === 'student' ) {
                controllers = ['app/controllers/answer'];
                module.load(controllers, function (Answer) {
                    var an = new Answer();
                    an.answer();
                    Backbone.history.start();
                    url.length < 2 && (url = 'answer/');
                    Backbone.history.saveLocation(url);
                });
            } else if( type === 'research') {
                controllers = ['app/controllers/test', 'app/controllers/topic', 'app/controllers/user'];
                module.load(controllers, function ( Tester, Topicer, User) {
                    var test = new Tester();
                    new Topicer();
                    new User();
                    Backbone.history.start();
                    url.length < 2 && (url = 'tests/lists/');
                    Backbone.history.saveLocation("tests/lists/");
                    test.listTests();
                });
            }
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

    module.exports = App;
    new App();
});
