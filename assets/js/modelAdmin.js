define(function(require,exports, module){

    var config   = require('config'),
        $        = require('libs/jquery'),
        Mustache = require('libs/mustache'),
        content  = $('#wrap');

    $.ajax({
        url      : 'assets/views/research.html',
        success  : function (data) {
            var html  = Mustache.to_html(data, config);
            content.html(html);
            module.load('app/uri.js', function (Controller) {
                var uriController = new Controller();
            });
        },
        dataType : 'html'
    });
});
