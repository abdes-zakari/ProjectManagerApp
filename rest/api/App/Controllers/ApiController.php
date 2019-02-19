<?php

namespace App\Controllers;

use Database\DB;
use App\Core\Controller;
use App\Models\ApiModel;

class ApiController extends Controller
{   
    private $api;

	public function __construct(){

        $this->api=new ApiModel();
        parent::__construct();
    }

	public function index(){

        $projects = (array)$this->api->all(); 

        echo json_encode(array_values($projects));
	}

    public function get($params= NULL){
        
        $project = (array)$this->api->getProject($params);

        echo json_encode($project);
    }

    public function createProject(){

        $request = json_decode(file_get_contents('php://input'), true);
        
        $lastId=$this->api->create($request);
        if ($lastId) {

            $lastRecord=(array)$this->api->getProject($lastId);

            echo json_encode($lastRecord[0]);
        }
    }

    public function deleteProject(){

        $id = json_decode(file_get_contents('php://input'), true);

        $this->api->deleteTaskByProject($id);

        return $this->api->delete($id);


    }

    public function getProjectTasks($id= NULL){

        $result = (array)$this->api->getProjectTasks($id);

        echo json_encode($result);
    }

    public function createTask(){

        $request = json_decode(file_get_contents('php://input'), true);
        
        $lastId=$this->api->createTask($request);

        if ($lastId) {

            $lastRecord=(array)$this->api->getTask($lastId);

            echo json_encode($lastRecord[0]);
        }
    }

    public function deleteTask(){

        $id = json_decode(file_get_contents('php://input'), true);

        return $this->api->deleteTask($id);
    }

    public function updateTask(){

        $request = json_decode(file_get_contents('php://input'), true);

        $this->api->updateTask($request);

    }

    public function allTask(){

        $tasks = (array)$this->api->allTask(); 

        echo json_encode(array_values($tasks));
    }

}