<?php

class AdminView {

    protected $_title   = APP_TITLE;
    protected $_userName;
    protected $_faseNav;
    protected $_menu;

    protected $_mainView;

    protected $_user;

    function __construct($user = FALSE)
    {
        if ( $user instanceof Users)
        {
            $this->_user = $user;
        }
        else
        {
            log_message('error','AdminView类接受参数必须是Users类');
        }
    }

    protected function _init()
    {
        $this->_userName = $this->_user->getUserName();
    }
}
