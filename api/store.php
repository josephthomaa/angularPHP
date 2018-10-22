<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  //print_r($request);die;

  // Validate.
  if(trim($request->data->name) === '' || (int)$request->data->details === '')
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  $name = mysqli_real_escape_string($con, trim($request->data->name));
  $details = mysqli_real_escape_string($con, $request->data->details);
  $version= mysqli_real_escape_string($con, (int)$request->data->version);;
    

  // Store.
  $sql = "INSERT INTO `learnangular`(`id`,`name`,`details`,`version`) VALUES (null,'{$name}','{$details}','{$version}')";
 
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $language = [
      'name' => $name,
      'details' => $details,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$language]);
  }
  else
  {
    http_response_code(422);
  }
}