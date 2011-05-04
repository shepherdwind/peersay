define(function(require,exports){

    var config   = require('config'),
        $        = require('libs/jquery'),
        Mustache = require('libs/mustache'),
        body     = $('body'),
        html     = Mustache.to_html(body.html(), config);

    body.html(html);

});
