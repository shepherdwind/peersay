<?php

class Tests extends CI_Controller {
    
    protected $_user;

    public function __construct()
    {
        parent::__construct();

        $fn = $this->uri->segment(2);
        if($fn !== 'lists')
        {
            if(!$this->session->userdata('id') > 0 OR $this->session->userdata("type") != "research" )
            {
                $message = array('error' => '没有权限');
                echo json_encode($message);
                exit();
            }

            $id = $this->session->userdata("id");
            $this->_user = new User();
            $this->_user->get_by_id($id);
        }
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
                $this->_user->save($obj);//保存关系
                echo $obj->to_json();
            }
            else
            {
                echo json_encode(array('error' => $obj->error->string));
            }
        }
        else if (isset($_POST['_method']) AND $_POST['_method'] === 'DELETE' )
        {
            $this->_user->delete($obj);
            $obj->delete();
        }
    }

    function lists()
    {
        if( $this->_user )
        {
            $t = $this->_user->test->get();
        } 
        else
        {
            $t = new Test();
            $t->get();
        }
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
