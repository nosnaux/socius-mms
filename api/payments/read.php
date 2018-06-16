<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

  include_once '../config/dbconnect.php';

  if(!empty($_GET["action"])) {
    if(strtolower(strip_tags(trim($_GET["action"]))) === "all") {
      echo getPayments($mysql);
    }
  } else {
    echo json_encode(array("error" => "action not found"));
  }

  function getPayments($aConn) {
    $query = "SELECT * FROM payments";
    $result = $aConn->query($query);
    if($result->num_rows > 0) {
      $paymentArray["payments"] = array();
      while($row = $result->fetch_assoc()) {
        extract($row);
        $payment_item = array(
          "id" => $payment_id,
          "memberid" => $member_id,
          "receiveddate" => $receieved_date,
          "paymentfor" => $payment_for,
          "paymentamount" => $payment_amount,
          "paymenttype" => $payment_type
        );
        array_push($paymentArray["payments"], $payment_item);
      }
      return json_encode($paymentArray);
    } else {
      return "{}";
    }
  }

?>
