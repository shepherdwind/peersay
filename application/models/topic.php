<?php

class Topic extends DataMapper {

    public $has_many = array('answer');
    public $has_one   = array('test');

    public $validation = array(
        'tocTitle' => array('required', 'max-length' => 150)
    );
}
