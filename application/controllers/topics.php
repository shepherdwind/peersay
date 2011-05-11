<?php

class Topics extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();

        if(!$this->session->userdata('id') > 0 OR $this->session->userdata("type") != "research" )
        {
            $message = array('error' => '没有权限');
            echo json_encode($message);
            exit();
        }

    }

    public function index ($id)
    {
        $t = new Topic();
        $t->get_by_id(13);
        echo $t->to_json();
    }

    public function edit ($id = 0)
    {
        $obj = new Topic();
        $obj->get_by_id( (int)$id );

        if( !$_POST)
        {
            echo $obj->to_json();
        }
        else if( isset($_POST['model']) AND $model = $_POST['model'] )
        {
            $testid = $this->session->userdata('testid');
            $topic = new Topic();
            $topic->from_json($model);
            $topic->test_id = $testid;
            if( $topic->save() )
            {
                echo $topic->to_json();
            }
            else
            {
                echo array( 'error' => $test->error->string);
            }

        }
        else if (isset($_POST['_method']) AND $_POST['_method'] === 'DELETE' )
        {
            $obj->delete();
        }
    }

    function lists($id = 0)
    {
        if( !$id)
        {
            $id = $this->session->userdata("testid");
        }
        $test = new Test();
        $test->get_by_id((int)$id);
        $t = $test->topic->get();

        $this->session->set_userdata(array('testid' => $id));
        //datamapper的json扩展真是强大
        echo $t->all_to_json();
    }

}
