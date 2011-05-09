<?php

class Tests extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
    }

    public function index ($id)
    {
        $t = new Test();
        $t->get_by_id(13);
        echo $t->to_json();
    }

    public function edit ($id = 0)
    {
        $obj = new Test();
        $obj->get_by_id( (int)$id );

        if( !$_POST)
        {
            echo $obj->to_json();
        }
        else if( isset($_POST['model']) AND $model = $_POST['model'] )
        {
            $obj->from_json($model);
            if( $obj->save() )
            {
                echo $obj->to_json();
            }
            else
            {
                echo json_encode(array('error' => $obj->error->string));
            }
        }
        else if (isset($_POST['_method']) AND $_POST['_method'] === 'DELETE' )
        {
            $obj->delete();
        }
    }

    function lists()
    {
        $t = new Test();
        $t->get();
        //datamapper的json扩展真是强大
        echo $t->all_to_json();
    }

    function addNew ()
    {
        $this->_create(json_decode($_POST['model']) );
        $test = new Test();
        $test->from_json($_POST['model']);
        if( $test->save() )
        {
            return $test->to_json();
        }
        else
        {
            return array( 'error' => $test->error->string);
        }
    }
}
