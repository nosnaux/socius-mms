<?php
/*
  @name retrieve_from_member_table()
  @params $conn (MySQL Connection), $id (Optional number search parameter)
  @description Retrieves member record(s) from the database.
*/
function retrieve_from_member_table($conn, $id) {
  $query = "SELECT * FROM members";
  // Append to query if there is an apparent search parameter
  if($id > 0) $query .= (" WHERE member_id = ".$id);
  if($result = $conn->query($query)) {
    if($result->num_rows > 0) {
      //If results returned is a single record, return a single JSON Object
      if($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        extract($row);
        $member_item = array(
          "id" => $member_id,
          "title" => $title,
          "firstname" => $first_name,
          "lastname" => $last_name,
          "prefname" => $pref_name,
          "regdate" => $regdate,
          "membertype" => $member_type,
          "address" => $address,
          "email" => $email,
          "contactnumber" => $contactnumber,
          "gender" => $gender,
          "dateofbirth" => $dob
        );
        return json_encode(array("result" => array("code" => 200, "message" => "OK"), "member" => $member_item));
      } else {
        //If results returned is multiple records, return a array of JSON Object
        $member_array = array();
        while($row = $result->fetch_assoc()) {
          extract($row);
          $member_item = array(
            "id" => $member_id,
            "title" => $title,
            "firstname" => $first_name,
            "lastname" => $last_name,
            "prefname" => $pref_name,
            "regdate" => $regdate,
            "membertype" => $member_type,
            "address" => $address,
            "email" => $email,
            "contactnumber" => $contactnumber,
            "gender" => $gender,
            "dateofbirth" => $dob
          );
          array_push($member_array, $member_item);
        }
        return json_encode(array("result" => array("code" => 200, "message" => "OK"), "members" => $member_array));
      }
    } else {
      return json_encode(array("result" => array("code" => 200, "message" => "OK"), "members" => "{}"));
    }
  } else {
    return json_encode(array("result" => array("code" => 500, "message" => "Server error: Could not complete operation (line: 7).")));
  }
}
?>
