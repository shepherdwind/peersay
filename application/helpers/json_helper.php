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

//str_getcsv在PHP5.3以上才有
if (!function_exists('str_getcsv')) {

    function str_getcsv($input, $delimiter=',', $enclosure='"', $escape=null, $eol=null) {
        $temp=fopen("php://memory", "rw");
        fwrite($temp, $input);
        fseek($temp, 0);
        $r = array();
        while (($data = fgetcsv($temp, 4096, $delimiter, $enclosure)) !== false) {
            $r[] = $data;
        }
        fclose($temp);
        return $r;
    } 
}
