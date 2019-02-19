<?php

namespace App\Models;

use Database\DB;
use Database\DBSqlite;
use App\Core\Model;

class ApiModel extends Model
{   

    public function all(){

     
         // $sql = "SELECT * FROM projects ORDER BY projects.id DESC";
    	// $sql = "SELECT * FROM Projects";
    	// $result = $this->db_sqlite->getData1($sql);

         $sql = " SELECT 
                  projects.id,
                  projects.project,
                  projects.description,
                  projects.deadline,
                  SUM(tasks.duration) as duration,
                  SUM(tasks.worked) as sumWorked,
                  SUM(tasks.timer_seconds) as sumWorkSeconds
                  FROM projects
                  LEFT JOIN tasks
                  ON projects.id = tasks.id_project
                  GROUP BY projects.id
                  ORDER BY projects.id DESC";

         $result = $this->db->query($sql);

         return $result;
    }

    public function getProject($id){

    	$sql = "  SELECT 
                  projects.id,
                  projects.project,
                  projects.description,
                  projects.deadline,
                  SUM(tasks.duration) as duration,
                  SUM(tasks.worked) as sumWorked
                  FROM projects
                  LEFT JOIN tasks
                  ON projects.id = tasks.id_project
                  WHERE projects.id = ?
                  GROUP BY projects.id
                  ORDER BY projects.id DESC";

         $result = $this->db->query($sql, [$id]);

         return $result;
    }

    public function create($request){


    	 unset($request['id']);

         // $sql = "INSERT INTO Projects (project,description,duration,deadline) VALUES ( ?, ?, ?, ?)";

         // $result = $this->db->query($sql, [$project,$description,$duration,$deadline]);
         $this->db->insert("Projects",$request);

         return $this->db->lastId();

    }

    public function delete($id){

         return $this->db->delete("Projects",$id);

    }
    
    public function getTasks($id){

    	 $sql = "SELECT * FROM tasks WHERE id_project= ?";

    	 $tasks = $this->db->query($sql, [$id]);

    	 return $tasks;
    }

    public function getProjectTasks($id){

    	 $project = (array)$this->getProject($id);

    	 $tasks = $this->getTasks($id);

    	 $project[0]->tasks = (array)$tasks;
         
        return $project[0];


    }

    public function createTask($request){


         $this->db->insert("tasks",$request);

         return $this->db->lastId();

    }

    public function getTask($id){

    	 $sql = "SELECT * FROM tasks WHERE id= ?";

    	 $task = $this->db->query($sql, [$id]);

    	 return $task;
    }

    public function deleteTask($id){

         return $this->db->delete("tasks",$id);

    }

    public function updateTask($fields){

        $id=$fields['id'];

        unset($fields['id']);
        

    	return $this->db->update('tasks',$fields,$id);
    }

    public function allTask(){
         
         $sql = "SELECT * FROM tasks ORDER BY tasks.id DESC";


         $result = $this->db->query($sql);

         return $result;
    }


    public function deleteTaskByProject($id_project){
         
         $sql = "DELETE FROM tasks WHERE id_project=?";


         $d = $this->db->query($sql, [$id_project]);

         return $d;
    }
}