<?php
  /*
  * @name retrieve_from_payment_table()
  * @param $conn (A MySQL Connection)
  * @description Retrieves a list of all payments from the database
  */
  function retrieve_from_payment_table($conn) {
    $query = "SELECT p.payment_id, CONCAT(m.first_name, ' ', m.last_name) as member, p.receieved_date, p.payment_for, p.payment_amount, p.payment_type FROM payments p, members m WHERE p.member_id = m.member_id;";
    if($result = $conn->query($query)) {
      if($result->num_rows > 0) {
        $payment_array = array();
        while($row = $result->fetch_assoc()) {
          extract($row);
          $payment_item = array(
            "receiptid" => $payment_id,
            "member" => $member,
            "recieveddate" => $receieved_date,
            "paymentfor" => $payment_for,
            "paymentamount" => $payment_amount,
            "paymenttype" => $payment_type
          );
          array_push($payment_array, $payment_item);
        }
        return json_encode(array("result" => array("code" => 200, "message" => "OK"), "payments" => $payment_array));
      } else {
        return json_encode(array("result" => array("code" => 200, "message" => "OK"), "payments" => "{}"));
      }
    } else {
      return json_encode(array("result" => array("code" => 500, "message" => "Server error: Could not complete operation (Line: 7).")));
    }
  }

?>
