<?php

namespace Database;

/**
 * 
 */
class DBSqlite{
    
    private static $instance = null;
	private $dbh = null, $table, $columns, $sql, $bindValues, $getSQL,
	$where, $orWhere, $whereCount=0, $isOrWhere = false,
	$rowCount=0, $limit, $orderBy, $lastIDInserted = 0;

	
	private function __construct(){
		
		try {
			// $this->dbh = new \PDO("mysql:host=".$config['host'].";dbname=".$config['database'].";charset=utf8", $config['username'], $config['password'] );
			// $this->dbh = new \SQLite3('mysqlitedb.db');
			$this->dbh = new \PDO('sqlite:Database/mysqlitedb.db');
			$this->dbh->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			// $this->dbh->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);
			$this->db_config = null;
		} catch (Exception $e) {
			die("Error establishing a database connection.");
		}
	}
    
    public static function getInstance(){
		if (!self::$instance) {
			self::$instance = new DBSqlite();
		}
		return self::$instance;
	}

	public function getData($query){// not working properly

		// return $this->dbh->query($query);
  
		$stmt = $this->dbh->prepare($query);
		// $stmt->bindValue();
		$stmt->execute();
		return $stmt->fetch();
	}

	public function getData1($query){

		$stmt = $this->dbh->query($query);
        $result = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {

            $result[] = $row;
        }
        return $result;
	}
}
