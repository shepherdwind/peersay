<?php

class Users extends CI_Controller {

    protected $_user;

    function __construct()
    {
        parent::__construct();

        $fn = $this->uri->segment(2);
        if($fn != 'login' AND $fn)
        {
            if(!$this->session->userdata('id') > 0 OR $this->session->userdata("type") != "research" )
            {
                $message = array('error' => '没有权限');
                echo json_encode($message);
                exit();
            }
        }
    }

    function index()
    {
        $this->load->view('admin/research_index');
    }

    public function edit ($id = 0)
    {
        $obj = new User();
        $obj->get_by_id( (int)$id );

        $testid = $this->session->userdata('testid');
        $test   = new Test();
        $test->get_by_id($testid);

        if( !$_POST)
        {
            echo $obj->to_json();
        }
        else if( isset($_POST['model']) AND $model = $_POST['model'] )
        {
            $obj->from_json($model);
            if( $obj->save() )
            {
                $test->save($obj);//保存关系
                echo $obj->to_json();
            }
            else
            {
                echo json_encode(array('error' => $obj->error->string));
            }
        }
        else if (isset($_POST['_method']) AND $_POST['_method'] === 'DELETE' )
        {
            $test->delete($obj);
            $obj->delete();
        }
    }

    function lists()
    {
        $testid = $this->session->userdata('testid');
        $test   = new Test();
        $test->get_by_id($testid);
        $t = $test->user->get_where(array('uType' => 'student'));
        //datamapper的json扩展真是强大
        echo $t->all_to_json();
    }

    function addBatch () 
    {
        $users = str_getcsv($_POST['users']);
        $saved = TRUE;

        $testid = $this->session->userdata('testid');
        $test   = new Test();
        $test->get_by_id($testid);

        foreach($users as $user)
        {
            $u = new User();
            $u->uStudId = $user[0];
            $u->uName   = $user[1];
            $u->uTyep   = 'student';
            if (! $u->save())
            {
                $saved = FALSE;
                break;
            }
            $test->save($u);
        }
        return 'saved';
    }

    function login () 
    {
        $name     = $_POST['name'];
        $password = $_POST['password'];
        $re       = array();
        $u        = new User();
        $u->get_where(array("uName" => $name));
        if ( $u->uPassword == $password)
        {
            $re['model']   = $u->to_array();
            $re['success'] = TRUE;
            $this->session->set_userdata(array( 'type' => $u->uType, 'id' => $u->id));
            echo json_encode($re);
        }
    }
}
