##seajs中的一个bug

当使用base配置时，可以正常加载js，但是use中加载模块有问题，
use的模块无法执行。
目录结构如下:

    assets/
      js/
        libs/
          seajs.js
          jquery.js
          mustache.js
          backbone.js
          …
        init.js
        hello.js
      css/

在init.js中初始化程序

    seajs.config({
        base : 'assets/js/'
    });
    seajs.use('hello',function(hello){
        console.log(hello);//null
    });

把seajs上移一个目录则没有问题。

## module.exports 的一个问题

在其他模块中load时返回的exports对象会有延迟大约50ms，所以
直接操作exports对象回报错，需要delay执行代码，感觉还是直接用require好。

    define(function (require, exports, module) {
        module.load(['jquery','backbone'], function ($,Backbone) {
            var Uri = Backbone.Controller.extend({
                //code
            });
            module.exports = new Uri();
        });
    });
