<?php

// namespace Core;
namespace App\Core;

use Smarty;

class Controller 
{    
	var $vars=array();

    public $smarty;

    public static $smart;

    public function __construct(){
             
         $this->smarty=new Smarty;
         Self::$smart=new Smarty;
    }

	public function set($data){
       
       $this->vars=array_merge($this->vars,$data);
	}

	public function view($filename,$data = ""){
       /*$abdsesd=array(
        	'nom' =>'Karim' ,
        	'land'=>'Morocco');*/


        	extract($this->vars);
            extract($data);

        	//print_r($this->vars);die();
        	//var_dump($datas);die();
        	/*if (isset($datas)) {
        		extract($datas);

        	}*/


		$view_path=ROOT.'App/Views/'.$filename.'.php';

        if (!file_exists($view_path)) {
        	die('View Not Found :'.$view_path);
        }
		require (ROOT.'App/Views/'.$filename.'.php');
		//require (ROOT.'views/'.get_class($this).'/'.$filename.'.php');
	}

}