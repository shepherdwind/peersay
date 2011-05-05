define(function(require,exports){

    var config   = require('config'),
        $        = require('libs/jquery'),
        Mustache = require('libs/mustache'),
        Backbone = require('libs/backbone'),
        _        = require('libs/underscore'),
        body     = $('body'),
        html     = Mustache.to_html(body.html(), config),
        obj      = {};

    _.extend(obj,Backbone.Events);
    obj.bind('init', function () {
        console.log('init-end');
    });

    body.html(html);
    obj.trigger('init');
});
