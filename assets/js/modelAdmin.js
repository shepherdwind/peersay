define(function(require,exports, module){

    var config   = require('config'),
        $        = require('libs/jqueryui'),
        Mustache = require('libs/mustache'),
        Backbone = require('libs/backbone'),
        content  = $('#wrap');

    $.ajax({
        url      : 'assets/views/research.html',
        success  : function (data) {
            var html  = Mustache.to_html(data, config);
            content.html(html);
            content.find('#top-nav a').button();

            var controllers = ['app/controllers/test', 'app/controllers/topic', 'app/controllers/user', 'app/controllers/answer' ];
            module.load( controllers , function (TestController, TopicController, UserController,AnswerController ) {
                new TestController();
                new TopicController();
                new UserController();
                new AnswerController();
                Backbone.emulateHTTP = true;
                Backbone.emulateJSON = true;
                Backbone.history.start();
            });
        },
        dataType : 'html'
    });
});
