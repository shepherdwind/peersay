define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        AddView    = require('app/views/topic'),
        Topic       = require('app/models/topic'),
        TopicList   = require('app/models/topics'),
        TopicListView = require('app/views/topics');

     module.exports    = Backbone.Controller.extend({
        routes    : {
            "topics/addNew"  : "addTopicView",
            "topics/lists/:id"   : "listTopics",
            "topics/:id"     : "edit"
        },
        addTopicView : function () {
            var view = new AddView({ model: new Topic(), controllers: this });
            this._bindTopicSave(view);
        },
        _bindTopicSave : function (view) {
            var self = this;
            view.bind('saved', function (url) {
                Backbone.history.saveLocation(url);
                if( url.indexOf('lists') > -1)
                    self.listTopics();
                else
                    self.addTopicView();
            });
        },
        edit        : function ( id ) {
            var T  = new Topic({ id : id, controllers : this });
            var self = this;
            T.fetch({
                success : function () {
                    var view = new AddView({ model: T });
                    self._bindTopicSave(view);
                },
                error   : function () {
                    alert("获取数据错误，请联系管理员。");
                }
            });
        },
        listTopics    : function (id) {
            var Ts = new TopicList();
            var listView = new TopicListView();
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
