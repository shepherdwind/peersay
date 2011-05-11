<?php

class User extends DataMapper {

    public $has_many = array('test');

    public $validation = array(
        'uName' => array(
            'label' => 'user name',
            'rules' => array('required','trim','max-length' => 100)
        )
    );

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
