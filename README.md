## 同伴题目测验平台

同伴提名技术测验的网络平台，同伴提名大多数用于社会关系测量中。
是心理学中广泛应用的研究方法。主要形式是在一个团体中进行施测，
由团体中人员根据测验项目选择团体中的人员。通常分为拒绝和接受
两种形式。

同伴提名发展到现在，又有了同伴评定，教师评定等方法的发展形式，
都是以提名的方法获取数据，在统计上存在很负责的数据格式化工作，
所以，使用计算机测量是非常有必要的事情。

##技术实现

总体上使用PHP+MySql+Apache实现，后台使用[Codeigniter](http://codeigniter.com/)
框架，并且依据[Datamapper](http://datamapper.exitecms.org/)构建
对象关系模型，整体上在后端处理都交由CI完成了。

在前端，有[Backbone](http://documentcloud.github.com/backbone/)构建
MVC模型，使用[Mustache](http://mustache.github.com/)解析视图层，所有
工作基本都是在前端完成，所以对web浏览器性能有一定的要求，最好能够使用
Firefox,Chrome,Opera,IE9等现代浏览器浏览。

##其他使用的开源技术

- [seajs](http://seajs.com)，由玉伯的seajs处理所有js的依赖关系，很完美的实现
- <http://jquery.com>&<http://jqueryui.com>&[Aristo](http://taitems.tumblr.com/post/482577430/introducing-aristo-a-jquery-ui-theme),强大的jQuery和jQuery UI，使用Aristo主题。
- [Underscores.js](http://documentcloud.github.com/underscores/)
- [Ckeditor](http://ckeditor.com),[Buzy.js](busy.netzgesta.de),[kissy css](http://kissyui.com)kissyui的doc做得好漂亮啊，有空可以尝试下.
- [minfy](http://code.google.com/p/minify)
