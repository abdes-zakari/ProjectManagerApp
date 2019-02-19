<?php

namespace App\Controllers;

use App\Core\Controller;


class HomeController extends Controller
{
	public function __construct(){
         
		 parent::__construct();
	}

	public function index(){
        
         parent::$smart->assign('name', 'Project Manager APP');
         parent::$smart->display('App/Views/tp/home.tpl');
	}
}