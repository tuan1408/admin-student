<?php
header("Access-Control-Allow-Origin: *");  // tất cả domain có thể truy cập tài nguyên
header("Content-Type: application/json; charset=UTF-8");  //cố định nội dung ở dạng json
header("Access-Control-Allow-Methods: GET");  // phương thức http mà server cho phép sử dụng
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
    $db = $database->getConnection();  //gọi đến phương thức getConnection để lấy kết nối csdl
    
    $item = new Students($db);  //tạo đối tượng từ lớp Students
    
    $item->id = isset($_GET['id']) ? $_GET['id'] : die();  // kiểm tra nếu tồn tại thì sẽ lấy id
    
    // gọi đến deleteStudent để xóa student theo id chỉ định
    if($item->deleteStudent()) {
        http_response_code(200); //status code http
        echo json_encode("Student deleted.");
    }else {
        http_response_code(503); //status code http
        echo json_encode("Data could not be deleted.");
    }
}

