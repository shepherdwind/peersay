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
        $exam = new Test();
        $exam->get_by_id( (int)$id );
        if( isset($_POST['model']) AND $model = $_POST['model'] )
        {
            $exam->from_json($model);
            if( $exam->save() )
            {
                echo $exam->to_json();
            }
            else
            {
                echo json_encode(array('error' => $exam->error->string));
            }
        }
        else
        {
            echo $exam->to_json();
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
    }

    public function _create ($obj)
    {
        $test = new Test();
        foreach($obj as $field => $value)
        {
            $test->{$field} = $value;
        }
        if( $test->save() )
        {
            return $test->to_json();
            //$this->_save_success();
        }
        else
        {
            return array( 'error' => $test->error->string);
            //$this->_save_failed( array( 'error' => $test->error->string));
        }
    }

}
