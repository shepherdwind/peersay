define(function (require, exports, module) {

    var _   = require('libs/underscore'),
        $   = require('libs/jqueryui'),
        Mustache = require('libs/mustache');

    var Tips = function () {
        this.initialize.apply(this,arguments);
    };


    _.extend(Tips.prototype, {

        initialize : function (config) {
            config = config || {};
            this.config = this.mix( config, this.defaults );
        },
        config     : {},
        mix        : function (r,o,ov) {
            _.each(o,function (val,key) {
                if(!r[key]) {
                    r[key] = val;
                } else if(ov) {
                    r[key] = val;
                }
            }, this);
            return r;
        },
        content    : '',
        setContent : function (html, json) {
            if (json) {
                this.content = $(Mustache.to_html(html, json));
            } else {
                this.content = $(html);
            }
        },
        defaults   : {
            autoOpen : true,
            width    : 400,
            minHeight: 50,
            show     : 'slide',
            title    : '提示',
            hide     : 'explode',
            close    : function () {
                $(this).remove();
            },
            buttons  : [{
                text : '确定',
                click: function () {
                    $(this).dialog("close");
                }
            }]
        },
        dialog     : function (html, json) {

            this.setContent(html, json);

            if( ! this.content ) {
                alert('对话框必须首先设置content');
            } else {
                this.content.dialog( this.config );
            }
        },
        //error错误提示, 传入字符串
        error       : function ( error) {
            var html = '<div class="ui-state-error ui-corner-all ui-tips"><p><span class="ui-icon ui-icon-alert"></span>{{error}}</p></div>';
            this.setContent(html, { error: error});
            
            var config = _.clone(this.config);
            config.title = '错误提示';
            config.buttons = {};
            this.content.dialog(config);
        },
        success    : function (json) {
            var html = '<div class="ui-corner-all ui-tips"><p><span class="ui-icon ui-icon-check"></span>{{message}}</p></div>';
            this.setContent(html, json);

            var config = _.clone(this.config);
            config.title = '操作成功';
            config.buttons = json.buttons;
            this.content.dialog(config);
        },
        confirm   : function ( json) {
            var html = '<div class="ui-corner-all ui-tips"><p><span class="ui-icon ui-icon-info"></span>{{message}}</p></div>';
            this.setContent(html, json);

            var config     = _.clone(this.config);
            config.title   = "确认操作";
            config.buttons = json.buttons;
            this.content.dialog(config);
        },
        popwindow : function (config) {
            var self = this;
            if( config.url ) {
                $.get(config.url, function (html) {
                    self.setContent(html, config.data);
                    var c     = _.clone(self.config);
                    c.title   = config.title;
                    c.modal   = true;
                    c.buttons = config.buttons;
                    self.content.dialog(c);
                });
            }
        }
    });

    module.exports = Tips;
});
