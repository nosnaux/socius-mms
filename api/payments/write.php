<?php

  include_once "read.php";

  function declare_new_payment($conn, $input) {
    $statement = $conn->prepare("INSERT INTO payments (payment_id, member_id, receieved_date, payment_for, payment_amount, payment_type) VALUES (?, ?, ?, ?, ?, ?)");
    $statement->bind_param("ssssss", $receiptid, $member, $recdate, $for, $paidamount, $type);
    foreach($input as &$i) $i = strtoupper($i);
    extract($input);
    if($statement->execute()) {
      return retrieve_from_payment_table($conn, $receiptid);
    } else {
      return json_encode(array("result" => array("code" => 500, "message" => $conn->error)));
    }
  }

?>
