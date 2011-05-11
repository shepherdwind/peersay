define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        $        = require('libs/jquery');

    module.exports = Backbone.Model.extend({
        url : function() {
            var base = 'index.php/answers/edit/';
            return base + this.get("step");
        },
        initialize : function () {
            this.template = '';
        },
        setCache   : function () {
            var data = this.Cache,
                o    = {
                    users  : data.users,
                    topics : data.topic,
                    test   : data.test
                };
            this.set(o);
            this.template  = data.template;
        },
        //缓存数据
        cacheData  : function () {
            var Cache = this.Cache;
            if (  'cached' in Cache ) {
                this.setCache();
            }
        },
        //保存已经添加过的数据
        _seleted   : [],
        //进入下一步，数据准备
        goNext     : function () {
        },
        setJson    : function () {
            var self  = this,
                step  = this.get('step');

            _.each(this.get("users"), function (user) {
                var in_array = false;
                _.each(self.get("aChoose"), function (id) {
                    if( user.id == id ){
                        in_array = true;
                    }
                });
                if(in_array)
                    user.selected = true;
                else
                    user.selected = false;
            });
            var num = this.get("topicNum"),
                obj = { 
                    'topic'  : self.get("topics")[step - 1], 
                    stepBack : true, 
                    backUrl  : self.get("step") - 1,
                    stepNext : true, 
                    nextUrl  : self.get("step") + 1,
                    //用户名随机排序
                    users    : this.get("users").sort(function () { return 0.5 - Math.random(); }) 
                };
            if( step == 1 ) {
                obj.stepBack = false;
            } else if( step == num ) {
                obj.stepNext = false;
            }
            self.set( obj );
        },
        selectUser  : function (id) {
            var aChoose = this.get('aChoose');
            aChoose.push(parseInt(id, 10) );
            this.set({'aChoose': aChoose});
            console.log(this.attributes.aChoose);
        },
        deleteUser  : function (id) {
            var aChoose = this.get('aChoose');
            this.set({
                'aChoose' : _.reject(aChoose, function (num) { return id == num; })
            });
            console.log(this.attributes.aChoose);
        },
        isFull      : function () {
            return this.get("aChoose").length >= this.get("topic").tocMax;
        },
        getMax      : function () {
            return this.get("topic").tocMax;
        },
        //发送数据到服务器前，只保留需要的attributes
        filter      : function (attrs) {
            var attributes = this.attributes;
            var Cache      = this.Cache;
            _(attributes).each(function (attr,field) {
                if( _.indexOf(attrs, field) == -1) {
                    Cache[field]  = attr;
                    delete attributes[field];
                }
            });
            Cache.cached  = true;
        }

    });
});
