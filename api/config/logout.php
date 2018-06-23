<?php
  session_start();
  $_SESSION = array();
  session_destroy();
  echo json_encode(array("result" => array("code" => 200, "message" => "OK")));
?>
