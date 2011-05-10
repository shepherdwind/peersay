<?php

class Answers extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
    }

    public function index ($id)
    {
        $t = new Topic();
        $t->get_by_id(13);
        echo $t->to_json();
    }

    public function edit ($id = 0)
    {
        $obj = new Answer();
        $obj->get_by_id( (int)$id );

        if( !$_POST)
        {
            $json = array_merge($obj->to_array(), $this->_get_test());
            $json['aChoose'] = array('3');
            echo json_encode( $this->_filter($json) );
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

    protected function _get_test ()
    {
        $test = new Test();
        $test->get_by_id(41);
        $json = array();
        $json['test'] = $this->_filter($test->to_array());

        $topics = new Topic();
        $topics->get();
        $json['topics'] = array();
        $tocNumber      = 0;

        foreach( $topics->all_to_array() as $topic )
        {
            $json['topics'][] = $this->_filter($topic);
            $tocNumber++;
        }
        $json['topicNum'] = $tocNumber;

        $users = new User();
        $users->get();
        $json['users'] = array();

        foreach( $users->all_to_array() as $user)
        {
            $json['users'][] = $this->_filter($user);
        }

        return $json;
    }

    function lists()
    {
        $t = new Topic();
        $t->get();
        //datamapper的json扩展真是强大
        echo $t->all_to_json();
    }

    //过滤一些字段，比如created
    protected function _filter($array, $field = array())
    {
        $field = array_merge((array)$field, array('created','updated'));
        foreach($field as $val)
        {
            if( array_key_exists($val, $array) )
            {
                unset( $array[$val] );
            }
        }
        return $array;
    }
}
