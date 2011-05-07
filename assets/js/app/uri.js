define(function (require, exports, module) {
    
    var Backbone   = require('libs/backbone'),
        $          = require('libs/jquery'),
        T          = require('app/test'),
        _          = require('libs/underscore');

     module.exports    = Backbone.Controller.extend({
        routes    : {
            "addTest" : "addTestView"
        },
        content   : function () {
            return $("#main-wrap");
        },
        initialize: function () {
            Backbone.history.start();
        },
        addTestView : function () {
            var self  = this,
                //阻止缓存
                url   = 'assets/views/addTest.html?' + Math.random(),
                content = self.content();

            content.load( url, function () {
                content.find("form").submit(_.bind(self.addTest, self));
                self.trigger('addInit');
            });
        },
        addTest   : function (e) {
            var node = e.target,
                test = new T.Test({
                    tTitle : node['tTitle'].value,
                    tDescribe : node['tDescribe'].value
                });
            console.log(T);
            test.save();
            return false;
        }
    });

    Backbone.sync = function (method, model ) {
        console.log(arguments);
    };

});
