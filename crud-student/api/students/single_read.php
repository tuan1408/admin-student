<?php
header("Access-Control-Allow-Origin: *");  // tất cả domain có thể truy cập tài nguyên
header("Content-Type: application/json; charset=UTF-8");  //cố định nội dung ở dạng json
header("Access-Control-Allow-Methods: GET");  // phương thức http mà server cho phép sử dụng
header("Access-Control-Max-Age: 3600");  //thời gian hợp lệ của request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );  //danh sách các header

include_once('../../config/database.php');
include_once('../../model/students.php');
include_once('../../libs/jwt.php');

$database = new Database();  //tạo đối tượng từ lớp Database
$db = $database->getConnection();  //gọi đến phương thức getConnection để lấy kết nối csdl

$item = new Students($db);  //tạo đối tượng từ lớp Students

$item->id = isset($_GET['id']) ? $_GET['id'] : die();  // kiểm tra nếu tồn tại thì sẽ lấy id

$item->getSingleStudent();   //gọi đến phương thức getSingleStudent để lấy dữ liệu từ bảng theo id

$bearer_token = get_bearer_token();
$is_jwt_valid = is_jwt_valid($bearer_token);

if($is_jwt_valid) {
    if($item->id != null) {
        // tạo mảng với các giá trị vừa lấy được
        $student_arr = array(
            "id" => $item->id, 
            "profile_code" => $item-> profile_code, 
            "student_code" => $item-> student_code, 
            "firstname" => $item-> firstname, 
            "lastname" => $item-> lastname, 
            "sex" => $item-> sex, 
            "date_of_birth" => $item-> date_of_birth, 
            "place_of_birth" => $item-> place_of_birth, 
            "race" => $item-> race, 
            "religion" => $item-> religion, 
            "phone" => $item-> phone, 
            "email" => $item-> email, 
            "personal_email" => $item-> personal_email, 
            "address" => $item-> address, 
            "identity_number" => $item-> identity_number, 
            "student_status" => $item-> student_status, 
            "note" => $item-> note
        );
    
        http_response_code(200);  //status code http
        echo json_encode($student_arr);  // chuyển sang json
    }else {
        http_response_code(404);  //status code http
        echo json_encode("Student not found.");
    }
}
