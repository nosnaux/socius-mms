<?php

  $usr = "root";
  $pwd = "";
  $hst = "localhost";
  $db = "sociusmms";

  $mysql = mysqli_connect($hst, $usr, $pwd, $db);

  if(!$mysql) {
    echo "ERROR: Unable to connect to MariaDB.".PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno().PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
  }


?>
