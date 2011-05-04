<?php

class Reseacher extends CreateStudent {

    function __construct()
    {
        parent::__construct();
    }

    /**
     *
     * 创建测验
     */
    function CreateTest()
    {
    }

    /**
     *
     * 获取测验
     * @param $id 测验id
     */
    function GetTest($id = 0)
    {
    }

    function CreateStudent()
    {
        parent::_createStudent();
    }
}
