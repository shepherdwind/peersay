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
            module.load('app/controllers/test', function (Controller) {
                var uriController = new Controller();
                Backbone.emulateHTTP = true;
                Backbone.emulateJSON = true;
                Backbone.history.start();
            });
        },
        dataType : 'html'
    });
});
