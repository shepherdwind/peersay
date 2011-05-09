<?php

class Users extends CI_Controller {

    protected $_user;

    function __construct()
    {
        parent::__construct();

        $fn = $this->uri->segment(2);
        $fn = $fn ? $fn : 'index';

        $this->_user = new User();

        if( !$this->_user->isPassed($fn) ) {
            show_error("没有访问权限啊，是不是没有<a href=". site_url('user/login') .">登录</a>");
        }

    }

    function index()
    {
        if ( $this->_user->getType() == USER_RESERCHER ) 
        {
            $this->load->view('admin/research_index');
        }
    }

    public function edit ($id = 0)
    {
        $obj = new User();
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
        $t = new User();
        $t->get();
        //datamapper的json扩展真是强大
        echo $t->all_to_json();
    }

    function addNew ()
    {
        $obj = new User();
        $obj->from_json($_POST['model']);
        if( $obj->save() )
        {
            return $obj->to_json();
        }
        else
        {
            return array( 'error' => $obj->error->string);
        }
    }

    function addBatch () 
    {
        $users = str_getcsv($_POST['users']);
        $saved = TRUE;
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
        }
        return 'saved';
    }
}
