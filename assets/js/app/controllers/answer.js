define(function (require, exports, module) {
    
    var _            = require('libs/underscore'),
        Backbone     = require('libs/backbone'),
        AddView      = require('app/views/answer'),
        Answer       = require('app/models/answer'),
        AnswerList   = require('app/models/answers'),
        AnswerListView = require('app/views/answers');

     module.exports    = Backbone.Controller.extend({
        routes    : {
            "action/lists/:id"     : "listAnswers",
            "answer/:id"           : "answer"
        },
        initialize : function () {
        },
        _bindAnswerSave : function (view) {
            var self = this;
            view.bind('saved', function (url) {
                Backbone.history.saveLocation(url);
                if( url.indexOf('lists') > -1)
                    self.listAnswers();
                else
                    self.addAnswerView();
            });
        },
        answer         : function ( id ) {
            id = parseInt(id, 10) || 1;
            var T  = new Answer({ id : id, controllers : this });
            var self = this;
            T.fetch({
                success : function () {
                    console.log(T);
                    var view = new AddView({ model: T });
                    //view.loading(document.body, 'loaded');
                    self._bindAnswerSave(view);
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
