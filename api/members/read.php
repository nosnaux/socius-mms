<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

  include_once '../config/dbconnect.php';

  if(!empty($_GET["action"])) {
    switch(strtolower($_GET["action"])) {
      case 'all':
        echo getAllMembers($mysql);
        break;
      case 'single':
        echo getSingleMember($mysql, $_GET["id"]);
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
    $query = "SELECT member_id, member_type, regdate, first_name, last_name, pref_name FROM members";
    if($result = $aConn->query($query)) {
      if($result->num_rows > 0) {
        $memberArray["members"] = array();
        while($row = $result->fetch_assoc()) {
          extract($row);
          $member_item = array(
            "id" => $member_id,
            "firstname" => $first_name,
            "lastname" => $last_name,
            "prefname" => $pref_name,
            "regdate" => $regdate,
            "membertype" => $member_type
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

/*
  @name getSingleMember()
  @params $aConn (MySQL Connection), $aMemberID (Integer)
  @description Searches the members table in the database for an exact match in ID
*/
  function getSingleMember($aConn,$aMemberID) {
    if(!empty($aMemberID)) {
      $query = "SELECT * FROM members WHERE member_id = ".strip_tags(trim($_GET["id"])).";";
      if($result = $aConn->query($query)) {
        if($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          extract($row);
          $member_item = array(
            "id" => $member_id,
            "membertype" => $member_type,
            "regdate" => $regdate,
            "title" => $title,
            "firstname" => $first_name,
            "lastname" => $last_name,
            "prefname" => $pref_name,
            "gender" => $gender,
            "dateofbirth" => $dob,
            "address" => $address,
            "contactnum" => $contactnumber,
            "email" => $email
          );
          return json_encode($member_item);
        } else {
          return "{}";
        }
      } else {
        return json_encode(array("error" => "Warning: Query error. Please check database and query line (60)."));
      }
    } else {
      return "{}";
    }
  }

?>
