<?php

namespace App\Core;

use Database\DB;
use Database\DBSqlite;

class Model 
{   
	public $db;
	public $db_sqlite;

	public function __construct(){
       
       $this->db = DB::getInstance();
       $this->db_sqlite = DBSqlite::getInstance();

	}
}