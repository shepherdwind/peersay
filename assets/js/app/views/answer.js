define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        $          = require('libs/jqueryui'),
        Busy       = require('libs/busy'),
        Mustache   = require('libs/mustache');

    var View       = Backbone.View.extend({
        events    : {
            "click .opration-bar a"     : "save",
            "click #user-content input" : "select"
        },
        initialize : function () {
            //_.bindAll(this,'render');
            //this.model.bind('change', this.render);
            //this.render();
        },
        reset      : function () {
            this.$("form")[0].reset();
            return false;
        },
        select     : function (e) {
            var destination = {};
            var target      = e.target;
            var empty       = false;
            var checked     = target.checked;
            var userId      = target.value;
            //alert('change');
            if( checked ) {
                destination = $(".selected li:last");
                if( ! destination.length ) {
                    destination = $(".selected");
                    empty       = true;
                }
            } else {
                destination = $(".unselected li:last");
                if( ! destination.length ) {
                    destination = $(".unselected");
                    empty       = true;
                }
            }
            this._moveTo($(target).parent(), destination,empty);
            this._choose(checked, userId);
        },
        _moveTo    : function (origin,destination,empty) {
            //alert($.browser.msie);
            var offset     = destination.offset();
            var style      = origin.offset();
            var styleReset = { position: 'inherit', zIndex : '', left : '', top : '' };
            style.position = 'absolute';
            style.zIndex   = 100;
            style.listStyle = 'none';
            origin.css(style);
            origin.appendTo(document.body);
            origin.animate({
                left  : empty ? offset.left : offset.left + 80,
                top   : offset.top
            }, 300, function () {
                if ( empty )
                    destination.append(origin);
                else
                    destination.after(origin);

                origin.css(styleReset);
            });
        },
        render     : function () {
            var self  = this,
                url   = 'assets/views/editAnswer.html';

            //显示加载状态

            //加载view
            if( this.model.template === '' ) {
                $.get( url, function (data) {
                    self.model.template = data;
                    self.model.Cache.template = data;
                    self._render.apply(self);
                    //加载结束,在控制器中开始调用加载提示
                    self.trigger('loaded');
                });
            } else {
                this._render();
                self.trigger('loaded');
            }
        },
        _render   : function () {
            var content = $("#content");
            var self    = this;
            var uiDisable = false;
            var finished  = Math.floor(this.model.get("step") * 100 / this.model.get("topicNum"));

            this.model.setJson();
            $(this.el).html( Mustache.to_html(this.model.template, this.model.toJSON() ) );
            this.$("#user-content").buttonset();
            this.$("#progressbar").progressbar({ value : finished });
            content.html(this.el);
        },
        /**
         *
         * 选择用户函数
         * @param select Bool|1|0
         * @param userId Number
         */
        _choose    : function (select, userId ) {
            if( select) {
               if( this.model.isFull() ) {
                    this._tips('error','本题最多选择' + this.model.get("topic").tocMax + '人', $(".unselected"));
                }
                this.model.selectUser(userId);
            } else {
                this.model.deleteUser(userId);
            }
        },
        /**
         *
         * 增加测试，表单提交时触发此函数
         */
        save      : function (e) {
            var self = this;
            var model  = this.model;
            var steps = model.get('topics').length;
            var step = parseInt(model.get('step'), 10);
            var url  = e.target.href;
            var goStep = url.match(/\/(\d+)$/);
            var goTo   = parseInt(goStep[1], 10);

            if(step <= steps ) {
                model.set({
                    step : goTo 
                });
                var V = new View();
                V.model = this.model;
                V.onloading();
                V.render();
                Backbone.history.saveLocation('answer/' + goTo);
            } else {
                //开始显示加载状态
                this.onloading(self.el);

                var data = {
                    'topic_id'  : this.model.get("topic").id
                };

                this.model.filter(['aChoose','aRefuse','topic_id','test_id','step','id']);

                this.model.save(data,
                {
                    success   : function () {
                        return false;
                    },
                    error     : function (model,error) {
                        self._tips('保存数据发生错误，请与研究者联系', error );
                    }
                });
            }

            return false;
        },
        /**
         *
         * 控制加载状态提示
         * @param node HTMLDOM the node show the loading images
         * @param event String 加载完成的事件
         * @param obj   Object 绑定事件的对象
         */
        onloading : function (node, event, obj) {
            var loading = Busy(node);
            node = node || document.body;

            obj = obj || this;
            event = event || 'loaded';

            obj.bind(event, function () {
                loading && loading.remove();
            });
        },
        /**
         *
         * 错误消息提示
         */
        _tips     : function (type, message, node) {
            node     = node || $("#main-wrap");
            type     = type || 'info';
            var self = this;

            var html = '<div class="ui-state-error ui-corner-all ui-tips"><p><span class="ui-icon ui-icon-alert"></span>'+message+'</p></div>';
            var tips = $(html).css({opacity: 0, 'padding' : '0.5em 1em', 'margin-bottom' : '10px'});
            var delayTime = 2000;
            if( type == 'error' ) {
                node.before(tips);
                tips.animate({
                    opacity : 0.7
                }, 400, function () {
                    _.delay(function () {
                        tips.animate({
                            opacity : 0,
                            height  : 0
                        }, 300, function () {
                            tips.remove();
                        });
                    }, delayTime);
                });
            }
        }
    });
    module.exports  = View;
});
