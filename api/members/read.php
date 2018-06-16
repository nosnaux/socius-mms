<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

  include_once '../config/dbconnect.php';

  if(!empty($_GET["action"])) {
    switch(strtolower(strip_tags(trim($_GET["action"])))) {
      case 'all':
        echo getAllMembers($mysql);
        break;
      case 'single':
        echo getSingleMember($mysql, strip_tags(trim($_GET["id"])));
        break;
      case 'simple':
        echo getAllSimpleMembers($mysql);
        break;
      default:
        echo json_encode(array("error" => "invalid action"));
    }
  } else {
    echo json_encode(array("error" => "action not found"));
  }

/*
  @name getAllMembers()
  @params $aConn (MySQL Connection)
  @description Retrieves all records from the database in the members table.
*/
  function getAllMembers($aConn) {
    $query = "SELECT * FROM members";
    if($result = $aConn->query($query)) {
      if($result->num_rows > 0) {
        $memberArray["members"] = array();
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
          array_push($memberArray["members"], $member_item);
        }
        return json_encode($memberArray);
      } else {
        return "{}";
      }
    } else {
      return json_encode(array("error" => "Query error. Please check database and query line (28)."));
      exit;
    }
  }


  $mysql->close();

?>
