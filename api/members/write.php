<?php
  include_once "read.php";
  /*
    @name declare_new_member()
    @param $conn (MySQL Connection), $data (PHP Post Data)
    @description Parses post data from the client, and adds a new record to database.
    @return a JSON Object
  */
  function declare_new_member($conn, $data) {
    $statement = $conn->prepare("INSERT INTO members (member_id, member_type, regdate, title, first_name, last_name, pref_name, address, email, contactnumber, gender, dob) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
    $statement->bind_param("ssssssssss", $mtype, $title, $firstname, $lastname, $prefname, $home_address, $email_address, $contactnumber, $gender, $dateofbirth);
    $email_address = $data["email"]; //Email should always preserve case-sensitivity according to user input
    foreach($data as &$d) $d = strtoupper($d);
    extract($data);
    if(!$prefname) $prefname = "";
    $home_address = $mainaddress." ".$suburb." ".$postcode." ".$state." AUSTRALIA"; //Country is reserved for sake of project
    if($statement->execute()) {
      return retrieve_from_member_table($conn, $conn->insert_id);
    } else {
      return json_encode(array("result" => array("code" => 500, "message" => "Query error on server (Line: 9).")));
    }
  }
?>
