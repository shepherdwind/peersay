define({
        title  : '同伴提名测验平台',
        nav     : [
            {
                'url'   : "/peersay/",
                'text'  : "Home",
                'first' : true 
            },
            {
                'url'   : "/peersay/index.php/users/logout",
                'text'  : "Logout"
            },
            {
                'url'   : "https://github.com/shepherdwind/peersay/blob/master/README.md",
                'text'  : "About"
            },
            {
                'url'   : "https://github.com/shepherdwind/peersay/",
                'text'  : "Code"
            }
        ],
        content : 'none',
        aside   : [
            { 
                title : '使用说明',
                items :[ { section : '此处显示相关指导语'} ]
            },
            {
                title : '登录',
                items :[ { section : '<a id="login" href="#login">点击此处</a>登录管理页面或者测试'} ]
            }
        ],
        copylink : 'http://shepherdwind.com',
        copyyear : '2011',
        owner    : 'shepherdwind'
});
