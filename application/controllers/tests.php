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

    public function download ($testId, $countIt = FALSE)
    {
        $testId = (int) $testId;
        $test   = new Test();
        $cvs    = 'id,姓名,学号';
        $test->get_by_id($testId);
        if( $test->id )
        {
            $topics = $test->topic->get();
            $users = $test->user->where(array('uType' => 'student'))->get();

            $topicsData = new Stdclass();
            $usersData  = new StdClass();
            $answersData = new Stdclass();
            foreach($topics->all as $topic)
            {
                $topicsData->{$topic->id} = $topic->to_array();
                for($i = 1; $i<=$topic->tocMax; $i++)
                {
                    $cvs .= ',' . $topic->tocTitle . '_' . $i;
                }
            }
            foreach($users->all as $user)
            {
                $usersData->{$user->id} = $user->to_array();
                $answers  = new Answer();
                $answers->where(array('user_id' => $user->id))->get();
                $cvs   .= "\n" . $user->id . ',' . $user->uName . ',' . (string)$user->uStudId;
                foreach($answers->all as $answer)
                {
                    $answersData->{$answer->topic_id} = explode(',',$answer->aChoose);
                }

                foreach($topicsData as $topic_id => $topic)
                {
                    if(isset($answersData->{$topic_id}))
                    {
                        $aChoose = $answersData->{$topic_id};
                    }
                    for($i = 0; $i<$topic['tocMax']; $i++)
                    {
                        if(isset($aChoose[$i]))
                        {
                            $cvs .= ',' . $aChoose[$i];
                        } 
                        else
                        {
                            $cvs .= ',' . '0';
                        }
                    }

                    $aChoose = NULL;
                }

                $answersData = NULL;//原来没有重置，导致问题
                $answers = NULL;
            }

            $this->load->helper('download');
            $cvs = iconv('UTF-8','GB2312',$cvs);
            if( $countIt )
            {
                $cvsCount = $this->downloadCount($cvs);
                force_download('result_'. $testId .'.csv', $cvsCount);
            }
            else
            {
                force_download('origin_'. $testId .'.csv', $cvs);
            }
        }
    }

    function downloadCount($csv)
    {
        $data = str_getcsv($csv);
        $topicsNoFormated = $data[0];
        $topics = array();
        foreach($topicsNoFormated as $key => $field)
        {
            if( $key >2 )
            {
                $tmp = explode('_',$field);
                $tmp = $tmp[0];
                if(isset($topics[$tmp]))
                {
                    $topics[$tmp] += 1;
                }
                else
                {
                    $topics[$tmp] =1;
                }
            }
        }

        $users  = new Stdclass();
        foreach($data as $key => $items)
        {
            if($key)
            {
                $user_id = $items[0];
                if(!isset($users->{$user_id}) ) 
                {
                    $users->$user_id = array();
                }
                $users->{$user_id}['user'] = array_slice($items,0,3);

                $index = 3;
                foreach($topics as $topic => $num)
                {
                    $n = $index;
                    for(;$index < $n + $num; $index ++)
                    {
                        $user = $items[$index] ;
                        if($user != 0)
                        {
                            if( !isset($users->$user))
                            {
                                $users->$user = array();
                            }

                            if( !isset($users->{$user}[$topic]))
                            {
                                $users->{$user}[$topic] = array('count' => 0, 'users' => '' );
                            }

                            $users->{$user}[$topic]['count'] +=1;
                            $users->{$user}[$topic]['users'] .= '-' . $user_id;
                        }
                    }
                }
            }
        }

        $cvs = 'id,姓名,学号';
        foreach($topics as $topic => $num)
        {
            $cvs .= ',' . $topic . ',counts(' . $num .")";
        }
        foreach($users as $colum)
        {
            $cvs .= "\n" . implode(',',$colum['user']);
            foreach($topics as $topic => $num)
            {
                if(isset($colum[$topic]))
                {
                    $cvs .= ',' . substr($colum[$topic]['users'], 1) . ',' . $colum[$topic]['count'];
                }
                else
                {
                    $cvs .= ',0,0';
                }
            }
        }
        return $cvs;
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

}
