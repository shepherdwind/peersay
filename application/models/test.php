<?php

class Test extends DataMapper {

    public $has_many = array('user','topic');
    public $has_one   = array();

    public $validation = array(
        'tTitle' => array('required', 'max-length' => 150)
    );
}
