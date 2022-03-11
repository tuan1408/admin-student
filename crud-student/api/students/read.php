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

// check isvalid jwt
$bearer_token = get_bearer_token();
$is_jwt_valid = is_jwt_valid($bearer_token);
if($is_jwt_valid) {
    $database = new Database();  //tạo đối tượng từ lớp Database
    $db = $database->getConnection();  //gọi đến phương thức get để lấy kết nối csdl

    $item = new Students($db);  //tạo đối tượng từ lớp Students

    $records = $item->getStudents();  //gọi đến phương thức getStudent để lấy dữ liệu từ bảng
    $itemCount = $records->num_rows; //trả về số hàng
    json_encode($itemCount); // chuyển sang json

    $item-> readFirstPage(); //gọi đến phương thức readFirstPage

}else {
    echo 'error';
}
