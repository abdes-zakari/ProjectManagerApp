<?php

require 'vendor/autoload.php';

define('WEBROOT', str_replace('index.php','', $_SERVER['SCRIPT_NAME']));

define('ROOT', str_replace('index.php','', $_SERVER['SCRIPT_FILENAME']));

require (ROOT.'App/Core/Model.php');

require (ROOT.'App/Core/Controller.php');

require 'routes.php';

cors();

// $urlParams=explode('/',$_GET['p']);
 // print_r($urlParams);die();

$params=explode('/',$_GET['p']);

// print_r($params);die();// print_r($routes);// print_r($scope);

//pass paramters to function in controller
if (isset($params[2])) {

    $urlParams=$params[2];
    unset($params[2]);
}

// print_r($params);die();
$scope=getRoute($params,$routes);
$controller=$scope[0];
$action=$scope[1];


// $controller=$params[0];
// $action=$params[1];
// $smarty = new Smarty;
require('App/Controllers/'.$controller.'.php');

$controller='App\Controllers\ '.$controller;

$controller=str_replace(" ","",$controller);

$controller=new $controller;

if (isset($urlParams)) {
	$controller->$action($urlParams); //pass paramters to function in controller
}else{
	$controller->$action();
}
