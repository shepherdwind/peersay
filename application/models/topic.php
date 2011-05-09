<?php

class Topic extends DataMapper {

    public $has_many = array('answer');
    public $has_one   = array('test');

    public $validation = array(
        'tocTitle' => array(
            'label' => 'topic title',
            'rules' => array('required', 'max-length' => 150)
        ),
        'tocMax'  => array(
            'label' => 'the maximum number of topic',
            'rules' => array('trim','integer')
        ),
        'tocMin'  => array(
            'label' => 'the minimum number of topic',
            'rules' => array('trim','integer')
        )
    );
}
