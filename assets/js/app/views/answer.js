define(function (require, exports, module) {
    
    var _          = require('libs/underscore'),
        Backbone   = require('libs/backbone'),
        $          = require('libs/jqueryui'),
        Busy       = require('libs/busy'),
        Mustache   = require('libs/mustache');

     module.exports    = Backbone.View.extend({
        events    : {
            "click .opration-bar .next"  : "save",
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
            //alert('change');
            if( e.target.checked ) {
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
        showFull    : function () {
            var self = this;
            var json = {
                message : "本题最多选择" + this.model.getMax() + '人。如果想继续修改，请点击“修改已选择”，当把选择区域的用户拖下来时，可以重新选择',
                buttons : [
                    {
                        text  : '下一题',
                        click : function () {
                            $(this).dialog("close");
                            self.goNext();
                        }
                    },
                    { 
                        text  : '修改已选择',
                        click : function () {
                            $(this).dialog("close");
                            //继续修改
                            self.furtherEdit();
                        }
                    }
                ]
            };
            this._tips('confirm', json);
        },
        goNext    : function () {
            var step = this.model.get("step");
            this.model.set({
                step : step + 1
            });
        },
        /**
         *
         * 选择用户函数
         * @param select Bool|1|0
         * @param userId Number
         * @param type   Enum  'start' | 'end'
         */
        _choose    : function (select, userId, type) {
            //尝试选择某个用户
            if( type === 'start' && 0 === parseInt(select,10) ) {
                //获取已经选择的用户数
               if( this.model.isFull() ) {
                    this._tips('error','不能再选了，本题最多选择' + this.model.get("topic").tocMax + '人');
                    return false;
                }
            } else if ( type === 'end') {
                //选择某个用户
                if( 1 === parseInt(select, 10)) {
                    this.model.selectUser(userId);
                    return true;
                } else if (0 === parseInt(select, 10)) {
                    this.model.deleteUser(userId);
                    return true;
                }
            }
            return true;
        },
        /**
         *
         * 增加测试，表单提交时触发此函数
         */
        save      : function () {
            var self = this;
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

            obj = obj || this;
            event = event || 'loaded';

            obj.bind(event, function () {
                loading.remove();
            });
        },
        _tips     : function (type, message) {
            var self = this;
            module.load('app/tips', function (Tips) {
                var tip = new Tips({'position': ['center',100]});

                //结束加载状态
                self.trigger("loaded");
                if( type in tip )
                    tip[type](message);

                tip = undefined;
            });
        }

    });
});
