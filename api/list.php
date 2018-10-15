<?php
/**
 * Returns the list of languages.
 */
require 'connect.php';
    
$languages = [];
$sql = "SELECT `id`,`name`,`details`,`version` FROM `learnangular`";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $languages[$cr]['id']    = $row['id'];
    $languages[$cr]['name'] = $row['name'];
    $languages[$cr]['details'] = $row['details'];
	$languages[$cr]['version'] = $row['version'];
    $cr++;
  }
    
  echo json_encode(['data'=>$languages]);
}
else
{
  http_response_code(404);
}