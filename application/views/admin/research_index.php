<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="min/?f=assets/css/common.css,assets/css/reset.css,assets/css/grids.css,assets/css/admin_base.css" />
    <script src="assets/js/sea.js" type="text/javascript" data-main="init"></script>
  </head>
  <body class="w866">
    <!--头部-->
    <div id="header">
      <div id="logo">{{title}}</div>

      <div id="top-nav" class="ks-clear">
        <ul>
          {{#topnav}}
          <li>
          <a href="{{url}}">{{title}}</a>
          </li>
          {{/topnav}}
        </ul>
      </div>

      <div id="welcome-words">{{welcome}}</div>

    </div>
    <!--头部-->

    <!--主体部分开始-->

    <div id="content" class="layout grid-s240m0">

      <div class="col-main">
        <div class="main-wrap" id="main-wrap">
          {{content}}
        </div>
      </div>

      <div class="col-sub">
        <div class="sub-wrap">
          <dl class="left-nav">
            {{#nav}}
            <dt>{{title}}</dt>
            {{#items}}
            <dd>
            <a href="{{href}}">{{title}}</a>
            </dd>
            {{/items}}
            {{/nav}}
          </dl>
        </div>
      </div>

    </div>
    <!--主体部分-->

    <div id="footer">
      <p class="copyright"> Copyright &copy; <a href="{{copylink}}" target="_blank">{{owner}}</a>&sdot;  {{copyyear}}</p>
    </div>

  </body>
</html>
