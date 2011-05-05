<?php

class Answer extends DataMapper {

    public $has_one   = array('user','topic');

}
