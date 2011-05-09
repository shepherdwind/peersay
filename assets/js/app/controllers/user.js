define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        AddView    = require('app/views/user'),
        User       = require('app/models/user'),
        UserList   = require('app/models/users'),
        UserListView = require('app/views/users');

     module.exports    = Backbone.Controller.extend({
        routes    : {
            "users/addNew"        : "addUserView",
            "users/lists/:id"     : "listUsers",
            "users/group"         : "addBatch",
            "users/:id"           : "edit"
        },
        addUserView : function () {
            var view = new AddView({ model: new User(), controllers: this });
            this._bindUserSave(view);
        },
        _bindUserSave : function (view) {
            var self = this;
            view.bind('saved', function (url) {
                Backbone.history.saveLocation(url);
                if( url.indexOf('lists') > -1)
                    self.listUsers();
                else
                    self.addUserView();
            });
        },
        edit        : function ( id ) {
            var T  = new User({ id : id, controllers : this });
            var self = this;
            T.fetch({
                success : function () {
                    var view = new AddView({ model: T });
                    self._bindUserSave(view);
                },
                error   : function () {
                    alert("获取数据错误，请联系管理员。");
                }
            });
        },
        addBatch     : function () {
            var listView = new UserListView();
            listView.addBatch();
            //添加完后显示列表
            listView.bind('batchSaved', this.listUsers);
        },
        listUsers    : function (id) {
            var Ts = new UserList();
            var listView = new UserListView();
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
