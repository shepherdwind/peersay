<?php

class Answers extends CI_Controller {
    
    protected $_user;
    public function __construct()
    {
        parent::__construct();

        if(!$this->session->userdata('id') > 0 )
        {
            $message = array('error' => '没有权限');
            setcookie('student',1,time() - 3600);
            echo json_encode($message);
            exit();
        }

        $id = $this->session->userdata("id");
        $this->_user = new User();
        $this->_user->get_by_id($id);

    }

    public function index ($id)
    {
        $t = new Topic();
        $t->get_by_id(13);
        echo $t->to_json();
    }

    public function edit ($step)
    {
        $obj = new Answer();

        if( !$_POST)
        {
            $data     = $this->_get_test();
            $topics   = $data['topics'];
            $topic_id = $topics[$step - 1]['id'];
            $condition = array('user_id' => $this->_user->id, 'topic_id' => $topic_id );

            $obj->where($condition)->get();

            $json = array_merge($obj->to_array(), $this->_get_test());
            $json['aChoose'] = $json['aChoose'] ? explode(',', $json['aChoose']) : array();
            echo json_encode( $this->_filter($json) );
        }
        else if( isset($_POST['model']) AND $model = $_POST['model'] )
        {
            $data = json_decode( $model );
            $get  = $this->_save($data);
            if( isset($get['error'] ))
            {
                json_encode($get);
            } else {
                $get['aChoose'] = explode(',',$get['aChoose']);
                echo json_encode($this->_filter($get));
            }
        }
        else if (isset($_POST['_method']) AND $_POST['_method'] === 'DELETE' )
        {
            $obj->delete();
        }
    }

    protected function _save ($data)
    {
        $obj           = new Answer();
        $condition     = array('user_id' => $this->_user->id, 'topic_id' => $data->topic_id);
        $obj->where($condition)->get();

        if( isset($data->selected) AND $data->selected )
        {
            foreach($data->selected as $tid => $choose)
            {
                $newData = new StdClass();
                $newData->topic_id = $tid;
                $newData->aChoose  = $choose;
                $this->_save($newData);
            }
        }
        $obj->aChoose  = implode(',', $data->aChoose);
        $obj->topic_id = $data->topic_id;
        $obj->user_id  = $this->_user->id;
        if( $obj->save() )
        {
            return $obj->to_array();
        }
        else
        {
            return array('error' => $obj->error->string);
        }
    }


    //需要的运算太大，最好放客户端统一完成后提交，可能存在性能问题
    protected function _get_test ()
    {
        $test = $this->_user->test->get();
        $json = array();
        $json['test'] = $this->_filter($test->to_array());

        $topics = $test->topic->get();
        $json['topics']  = array();
        $json['answers'] = new StdClass();
        $tocNumber       = 0;

        foreach( $topics->all as $topic )
        {
            $json['topics'][] = $this->_filter($topic->to_array());
            $answer           = $topic->answer->where(array('topic_id' => $topic->id))->get();
            if ( $answer->aChoose != '' )
            {
                $json['answers']->{$topic->id} = explode(',',$answer->aChoose);
            }
            $tocNumber++;
        }
        $json['topicNum'] = $tocNumber;

        $users = $test->user->get_where(array('uType'=>'student'));
        $json['users'] = array();

        foreach( $users->all_to_array() as $user)
        {
            //删除自身
            if( $user['id'] != $this->_user->id )
            {
                $json['users'][] = $this->_filter($user);
            }
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
