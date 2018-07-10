<?php
  /*
  * @name retrieve_from_payment_table()
  * @param $conn (A MySQL Connection), $searchid (An optional search string)
  * @description Retrieves a list of all payments from the database
  */
  function retrieve_from_payment_table($conn, $paymentidsearch = false, $memberidsearch = false) {
    $query = "SELECT p.payment_id, CONCAT(m.first_name, ' ', m.last_name) as member, p.receieved_date, p.payment_for, p.payment_amount, p.payment_type FROM payments p, members m";

    if($memberidsearch) {
      $query .= (" WHERE m.member_id = '".$memberidsearch."'");
    } else {
      $query .= " WHERE m.member_id = p.member_id";
    }

    if($paymentidsearch) $query .= (" && p.payment_id = '".$paymentidsearch."'");

    $query .= " ORDER BY p.receieved_date;";

    if($result = $conn->query($query)) {
      if($result->num_rows > 0) {
        if($result->num_rows > 1) {
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
          $row = $result->fetch_assoc();
          extract($row);
          $payment_item = array(
            "receiptid" => $payment_id,
            "member" => $member,
            "recieveddate" => $receieved_date,
            "paymentfor" => $payment_for,
            "paymentamount" => $payment_amount,
            "paymenttype" => $payment_type
          );
          return json_encode(array("result" => array("code" => 200, "message" => "OK"), "payment" => $payment_item));
        }
      } else {
        return json_encode(array("result" => array("code" => 200, "message" => "OK"), "payments" => "{}"));
      }
    } else {
      return json_encode(array("result" => array("code" => 500, "message" => $conn->error)));
    }
  }

?>
