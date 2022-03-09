<?php
// CORS 
header("Access-Control-Allow-Origin: *");  // tất cả domain có thể truy cập tài nguyên
header("Content-Type: application/json; charset=UTF-8");  //cố định nội dung ở dạng json
header("Access-Control-Allow-Methods: POST");  // phương thức http mà server cho phép sử dụng
header("Access-Control-Max-Age: 3600");  //thời gian hợp lệ của request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);  //danh sách các header

include_once('../../config/database.php');
include_once('../../model/students.php');
include_once('../../libs/jwt.php');

$database = new Database();  //tạo đối tượng từ lớp Database
$db = $database->getConnection();  //gọi đến phương thức get để lấy kết nối csdl
$response = array();

$bearer_token = get_bearer_token();
$is_jwt_valid = is_jwt_valid($bearer_token);

if(true) {
    $database = new Database();  //tạo đối tượng từ lớp Database
    $db = $database->getConnection();  //gọi đến phương thức get để lấy kết nối csdl

    $item = new Students($db);  //tạo đối tượng từ lớp Students

    $records = $item->getStudents();  //gọi đến phương thức getStudent để lấy dữ liệu từ bảng
    $itemCount = $records->num_rows; //trả về số hàng
    json_encode($itemCount);

    $item->paginationPage();
}


// $sqlQuery = "SELECT COUNT(*) FROM students";
// $result = $db->query($sqlQuery);
// $itemCount = $result->num_rows;
// var_dump($result);
// var_dump($itemCount);
// die;


// $bearer_token = get_bearer_token();
// $is_jwt_valid = is_jwt_valid($bearer_token);

// if($is_jwt_valid) {
    
//     $records = $item->getStudents();  //gọi đến phương thức getStudent để lấy dữ liệu từ bảng
//     $itemCount = $records->num_rows; //trả về số hàng
//     json_encode($itemCount); // chuyển sang json

//     if($itemCount > 0) {
//         $studentsArr = array();  //tạo mảng
//         $studentsArr["body"] = array(); //tạo tên định danh của phần tử (acces key)

//         while ($row = $records->fetch_assoc()) { //gán kết quả vào mảng kết hợp, có thể loop
//             array_push($studentsArr["body"], $row); // thêm dữ diệu từ $row vào mảng
//         }
//         http_response_code(200);  //status code http
//         echo json_encode($studentsArr);
//         // json_encode($studentsArr);
//         return json_encode($studentsArr);
//         // return $studentsArr;
//     }else {
//         http_response_code(404); //status code http
//         echo json_encode(
//             array("message" => "No record found.")
//         );
//     }
// }else {
//     echo 'error';
// }

