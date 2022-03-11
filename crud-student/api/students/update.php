<?php
header("Access-Control-Allow-Origin: *");  // tất cả domain có thể truy cập tài nguyên
header("Content-Type: application/json; charset=UTF-8");  //cố định nội dung ở dạng json
header("Access-Control-Allow-Methods: POST");  // phương thức http mà server cho phép sử dụng
header("Access-Control-Max-Age: 3600");  //thời gian hợp lệ của request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);  
include_once('../../config/database.php');
include_once('../../model/students.php');
include_once('../../libs/jwt.php');

//check isvalid jwt
$bearer_token = get_bearer_token();
$is_jwt_valid = is_jwt_valid($bearer_token);
if($is_jwt_valid) {
    $database = new Database();  //tạo đối tượng từ lớp Database
    $db = $database->getConnection();  //gọi đến phương thức getConnection để lấy kết nối csdl
    
    $item = new Students($db);  //tạo đối tượng từ lớp Students
    
    $item->id = isset($_POST['id']) ? $_POST['id'] : die();  // kiểm tra nếu tồn tại thì sẽ lấy id
    // dữ liệu phục vụ cập nhật
    $item-> profile_code = $_POST['profile_code'];
    $item-> student_code = $_POST['student_code'];
    $item-> firstname = $_POST['firstname'];
    $item-> lastname = $_POST['lastname'];
    $item-> sex = $_POST['sex'];
    $item-> date_of_birth = $_POST['date_of_birth'];
    $item-> place_of_birth = $_POST['place_of_birth'];
    $item-> race = $_POST['race'];
    $item-> religion = $_POST['religion'];
    $item-> phone = $_POST['phone'];
    $item-> email = $_POST['email'];
    $item-> personal_email = $_POST['personal_email'];
    $item-> address = $_POST['address'];
    $item-> identity_number = $_POST['identity_number'];
    $item-> student_status = $_POST['student_status'];
    $item-> note = $_POST['note'];

    // gọi đến updateStudent để cập nhật dữ liệu
    if($item->updateStudent()) {
        http_response_code(200); //status code http
        echo json_encode("Student data updated");
    }else {
        http_response_code(503); //status code http
        json_encode("Student could not be updated");
    }
}
