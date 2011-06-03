(function () {
    /**
     * @class
     * 背包问题算法
     */
    var Packsack = function () {
        this.initialize.apply(this,arguments);
    };

    /**
     * the problem space 
     */
    var attrs    = {
        // items definition and value
        items       : [],
        itemsWeight : [],
        maxWeight   : 0,
        maxValue    : 0,
        bag         : []
    };

    Packsack.prototype = {
        initialize : function (config) {
            this.setAll(config);
            this._start();
        },
        attributes : attrs,
        set        : function (key,value) {
            this.attributes[key] = value;
        },
        get        : function (key) {
            return this.attributes[key];
        },
        setAll     : function (obj) {
            for(var i in obj) {
                obj.hasOwnProperty(i) &&
                    this.set(i,obj[i]);
            }
        },
        _start     : function () {
            var items  = this.get("items");
            var len    = items.length;
            var data   = [len - 1, this.get("maxWeight"), 0];
            this._pack(data);
        },
        _pack      : function (data) {
            var items  = this.get("items");
            var itemsW = this.get("itemsWeight");
            var maxValue = this.get("maxValue");
            if(data[0] > -1 ) {
                var left  = [data[0] - 1,data[1],data[2]];
                this._pack(left);
                maxValue  = (maxValue > data[2] ? maxValue : data[2]);

                //计算剩余重量
                var remain = data[1] - itemsW[data[0]];
                var value  = data[2] + items[data[0]];
                if( remain >= 0 ) {
                    var right = [data[0] - 1,remain,value];
                    maxValue  = (maxValue > value ? maxValue : value);
                    this._pack(right);
                }
                this.set("maxValue", maxValue);
            } 
        }
    };

    window.Packsack = Packsack;
})();
