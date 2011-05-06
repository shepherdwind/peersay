define(function (require, exports, module) {
    
    var Backbone   = require('libs/backbone'),
        $          = require('libs/jquery');

     module.exports    = Backbone.Controller.extend({
        routes    : {
            "addTest" : "addTest"
        },
        content   : function () {
            return $("#main-wrap");
        },
        initialize: function () {
            Backbone.history.start();
        },
        addTest   : function () {
            var self  = this,
                //阻止缓存
                url   = 'assets/views/addTest.html?' + Math.random();
            this.content().load( url, function () {
                self.trigger('addInit');
            });
        }
    });

});
