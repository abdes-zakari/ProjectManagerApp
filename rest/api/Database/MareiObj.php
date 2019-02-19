<?php
namespace Database;

//Start Marei Object Class
class MareiObj{

    public function toJSON()
    {
        return json_encode($this, JSON_NUMERIC_CHECK);
    }

    public function toArray()
    {
        return (array) $this;
    }

    public function __toString() {
        header("Content-Type: application/json;charset=utf-8");
        return json_encode($this, JSON_NUMERIC_CHECK);
    }
    
}
// End Marei Object Class