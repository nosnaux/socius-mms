<?php

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  include "config/dbconnect.php";
  include "payments/read.php";
  include "payments/write.php";

  switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
      echo retrieve_from_payment_table($mysql);
      break;
    case 'POST':
      echo declare_new_payment($mysql, json_decode(file_get_contents("php://input"), TRUE));
      break;
    case 'PUT':
      break;
    case 'DELETE':
      break;
    default:
      break;
  }

  $mysql->close();

?>
