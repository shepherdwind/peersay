define(function(require,exports, module){
    
    var _        = require('libs/underscore'),
        Backbone = require('libs/backbone'),
        $        = require('libs/jquery');

    module.exports = Backbone.Model.extend({
        url : function() {
            var base = 'index.php/answers/edit';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        },
        initialize : function () {
            this.set( { step : 1} );
            this.bind("change:step", function () {
                console.log('step change');
                console.log( arguments );
            });
        },
        template   : '',
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
                obj = { 'topic' : self.get("topics")[step], stepBack: true, stepNext: true };
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
        }

    });
});
