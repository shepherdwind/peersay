<?php

class Users extends CI_Controller {

    protected $_user;

    function __construct()
    {
        parent::__construct();
        $this->load->model('users');
        $this->load->helper('url');

        $fn = $this->uri->segment(2);
        $fn = $fn ? $fn : 'index';

        if( !$this->users->isPassed($fn) ) {
            show_error("没有访问权限啊，是不是没有<a href=". site_url('user/login') .">登录</a>");
        }

    }

    function index()
    {
        if ( $this->users->getType() == USER_RESERCHER ) 
        {
            $this->load->view('admin/research_index');
        }
    }
}
