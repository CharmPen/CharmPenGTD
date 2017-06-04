<?php
    require_once('myGTDdbInfo.php');

    header("Content-Type: application/json; charset = UTF-8");
    $obj = json_decode($_POST["x"], false);
    
    if( $obj->operation == "init" ){
        $dataInpt = getProjects(0);
        $dataPro = getProjects(1);
        $dataSteps = getSteps();

        $listInpt = array();
        $listInpt = $dataInpt->fetch_all(MYSQLI_ASSOC);

        $listPro = array();
        $listPro = $dataPro->fetch_all(MYSQLI_ASSOC);

        $listSteps = array();
        $listSteps = $dataSteps->fetch_all(MYSQLI_ASSOC);

        $outp = new stdClass();
        $outp->listInpt = $listInpt;
        $outp->listPro = $listPro;
        $outp->listSteps = $listSteps;

    }
    else if( $obj->operation == "updateProValue" ){
        $outp = setProValue($obj->id, $obj->value);
    }
    else if( $obj->operation == "updateStepValue" ){
        $outp = setStepValue($obj->id, $obj->value);
        //$outp = null;
    }
    else{ $data = null; }

    
    echo json_encode( $outp );

    function getProjects($status) {
        $query = "SELECT * FROM projectGTD WHERE state = " . $status;
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        $projects = mysqli_query($dbc, $query);
        mysqli_close($dbc);
        
        return $projects;
    }

    function getSteps() {
        $query = "SELECT * FROM stepsGTD ";
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        $steps = mysqli_query($dbc, $query);
        mysqli_close($dbc);

        return $steps;
    }

    function setProValue( $id, $value ) {
        
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        $safe_id = mysqli_real_escape_string($dbc, htmlentities($id));
        $safe_value = mysqli_real_escape_string($dbc, htmlentities($value));
        $query = "UPDATE projectGTD SET value='". $safe_value . "' WHERE id=" .$safe_id;
//        echo( $query );
        $rslt = mysqli_query($dbc, $query);
        mysqli_close($dbc);

        return $rslt;
    }

    function setStepValue( $id, $value ) {
        
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        $safe_id = mysqli_real_escape_string($dbc, htmlentities($id));
        $safe_value = mysqli_real_escape_string($dbc, htmlentities($value));
        $query = "UPDATE stepsGTD SET value='". $safe_value. "' WHERE id=". $safe_id;
//        echo( $query );
        $rslt = mysqli_query($dbc, $query);
        mysqli_close($dbc);

        return $rslt;
    }

?>

