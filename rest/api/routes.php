<?php


$routes=
[   '/' => 'HomeController@index',
    'projects/' => 'ApiController@index',
    'project/get/' => 'ApiController@get',
    'project/add/' => 'ApiController@createProject',
    'project/delete/' => 'ApiController@deleteProject',
    'project/task/' => 'ApiController@getProjectTasks',
    'task/add/' => 'ApiController@createTask',
    'task/update/' => 'ApiController@updateTask',
    'task/delete/' => 'ApiController@deleteTask',
    'task/all/' => 'ApiController@allTask',
    'form/' => 'ApiController@testForm'
];




function getRoute($params,$routes){

     $request="";
    
    foreach ($params as $p) {
    
        $request.= $p.'/';
    }

    if (array_key_exists($request, $routes)) {

        $scope=$routes[$request];
    }else{

        die('Route Not exist');
    }

    $scope=explode('@',$scope);

    return $scope;
}



function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

}




