<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 *
 * 判断是否存在json_encode函数
 * 没有则定义之
 * 注：PHP 5.2以上才有json函数
 */
if ( ! function_exists ('json_encode') )
{
    function json_encode($var)
    {
        $CI = & get_instance();
        $CI->load->library('json');
        return $CI->json->encode($var);
    }
}

if ( ! function_exists( 'json_decode' ) )
{
    function json_decode($var)
    {
        $CI = & get_instance();
        $CI->load->library('json');
        return $CI->json->decode($var);
    }
}
