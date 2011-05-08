define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        AddView    = require('app/views/test'),
        Test       = require('app/models/test'),
        TestList   = require('app/models/tests'),
        TestListView = require('app/views/tests');

     module.exports    = Backbone.Controller.extend({
        routes    : {
            "tests/addNew"  : "addTestView",
            "tests/lists"   : "listTests",
            "tests/:id"     : "edit"
        },
        addTestView : function () {
            var view = new AddView({ model: new Test(), controllers: this });
            this._bindTestSave(view);
        },
        _bindTestSave : function (view) {
            var self = this;
            view.bind('testSaved', function (url) {
                Backbone.history.saveLocation(url);
            });
        },
        edit        : function ( id ) {
            var T  = new Test({ id : id, controllers : this });
            var self = this;
            T.fetch({
                success : function () {
                    var view = new AddView({ model: T });
                    self._bindTestSave(view);
                },
                error   : function () {
                    alert("获取数据错误，请联系管理员。");
                }
            });
        },
        listTests    : function () {
            var Ts = new TestList();
            Ts.fetch({
                success : function () {
                    new TestListView({ collection: Ts});
                },
                error   : function () {
                    var listView = new TestListView({ collection: Ts});
                    listView.trigger('fetchListError');
                }
            });
        }

    });

});
