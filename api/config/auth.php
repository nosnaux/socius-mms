<?php

  /*
  * File: auth.php
  * Purpose: The set the current session with provided
  *          credentials once user has successfully logged
  *          in with Auth0.
  */

  session_start();
  $credentials = json_decode(file_get_contents("php://input"));
  $_SESSION["access_token"] = $credentials["access_token"];
  $_SESSION["id_token"] = $credentials["id_token"];
  echo json_encode(array("result" => array("code" => 200, "message" => "OK")));
?>
