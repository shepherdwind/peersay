define(function (require, exports, module) {
    
    var _            = require('libs/underscore'),
        Backbone     = require('libs/backbone'),
        AddView      = require('app/views/answer'),
        Answer       = require('app/models/answer');


     module.exports    = Backbone.Controller.extend({
        routes    : {
            "action/lists/:id"     : "listAnswers",
            "answer/:step"  : "answer"
        },
        initialize : function () {
            this.Cache = {};
        },
        //数据缓存
        answer          : function (step) {
            step     = parseInt(step, 10) || 1;

            var T    = new Answer({ step : step });
            T.Cache  = this.Cache;//建立引用
            T.cacheData();//开始缓存

            var view = new AddView({ model: T });
            var self = this;
            view.onloading(document.body);
            T.fetch({
                success : function () {
                    view.render();
                },
                error   : function () {
                    alert("获取数据错误，请联系管理员。");
                }
            });
        },
        listAnswers    : function (id) {
            var Ts = new AnswerList();
            var listView = new AnswerListView();
            listView.onloading(document.body, 'loaded');
            Ts.fetch({
                success : function () {
                    listView.collection = Ts ;
                    listView.render();
                },
                error   : function () {
                    listView.trigger('fetchListError');
                    listView.trigger('loaded');
                }
            });
        }

    });

});
