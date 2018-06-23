<?php

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  include "config/dbconnect.php";
  include "members/read.php";
  include "members/write.php";

  switch($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
      if(isset($_GET["id"])) {
        echo retrieve_from_member_table($mysql, $_GET["id"]);
      } else {
        echo retrieve_from_member_table($mysql, 0);
      }
      break;
    case 'POST':
      echo declare_new_member($mysql, json_decode(file_get_contents('php://input'), TRUE));
      break;
    //Edits an exisiting member in database, and returns Member => JSON Config
    case 'PUT':
      break;
    //Deletes an existing member from database, and returns a result => JSON Config
    case 'DELETE':
      break;
    default:
      echo json_encode(array("result" => array("code" => 500, "message" => "Server error: No request method(s) found.")));
      break;
  }

  $mysql->close();

?>
