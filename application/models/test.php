<?php

class Test extends DataMapper {

    public $has_many = array('user','topic');
    public $has_one   = array();

    public $validation = array(
        'tTitle' => array(
            'label' => 'test title',
            'rules' => array('required', 'max-length' => 150, 'trim')
        ),
        'tDescribe' => array(
            'label' => 'test describe',
            'rules' => array('required','trim')
        )
    );
}
