<?php

class Users extends CI_Model {
    //用户名
    protected $_name;
    //用户id
    protected $_userId;

    function __construct($name = 'test' ,$id = '0')
    {
        parent::__construct();
        $this->_name   = $name;
        $this->_userId = $id;
    }

    function getUser()
    {
    }

    /**
     *
     * 用户登录接口
     *
     * @return FAlSE | Array 登录信息
     */
    protected function login ()
    {
    }

    function isPassed ($fuc = 'index')
    {
        return TRUE;
    }

    function getType()
    {
        return USER_RESERCHER;
    }
}
