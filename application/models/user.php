<?php

class User extends DataMapper {

    public $has_many = array('test');

    public $validation = array(
        'uName' => array(
            'label' => 'user name',
            'rules' => array('required','trim','max-length' => 100)
        ),
        'uPassword' => array (
            'label' => 'password',
            'rules' => array('trim','required','min-length' => 3, 'encrypt')
        )
    );

    protected function _encrypt($field)
    {
        // Don't encrypt an empty string
        if (!empty($this->{$field}))
        {
            $this->{$field} = sha1($this->uStudId. $this->{$field});
        }
    }

    function login ($name, $password)
    {
        $this->get_where(array("uName" => $name));
        $password = sha1($this->uStudId . $password);
        return $this->uPassword === $password;
    }
}
