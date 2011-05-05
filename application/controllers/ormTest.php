<?php

class OrmTest extends CI_Controller {

    function __construct () 
    {
        parent::__construct();
    }

    function index() 
    {
        $u = new User();
        $u->get_by_id(1);

        var_export($u->test->get()->tTitle);
    }

    function addTest()
    {
        $t  = new Test();
        $t->tTitle = '测试题目';
        $t->save();
    }

    function addUserTest($id)
    {
        $t = new Test();
        $t->get_by_id($id);
        $u = new User();
        $u->get_by_id(1);

        $u->save($t);
    }

    function addTopic ($title = 'none')
    {
        $toc  = new Topic();
        $toc->tocTitle = $title;
        $toc->tocMax   = 4;
        if($toc->save())
        {
            echo $toc->to_json();
        }
    }

    function addTopicToTest($id = 1)
    {
        $toc = new Topic();
        $toc->get_by_id($id);
        $t   = new Test();
        $t->get_by_id(2);
        if($t->save($toc))
        {
            echo $toc->to_json();
        }
    }

    function getTest()
    {
        $t = new Test();
        foreach($t->get_by_id(2)->topic->get() as $o)
        {
            echo $o->to_json();
        }
    }
}
