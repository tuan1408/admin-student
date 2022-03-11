<?php
header("Access-Control-Allow-Origin: *");  // tất cả domain có thể truy cập tài nguyên
header("Content-Type: application/json; charset=UTF-8");  //cố định nội dung ở dạng json
header("Access-Control-Allow-Methods: POST");  // phương thức http mà server cho phép sử dụng
header("Access-Control-Max-Age: 3600");  //thời gian hợp lệ của request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);  //danh sách các header

include_once('../../config/database.php');
include_once('../../libs/jwt.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();  //tạo đối tượng từ lớp Database
    $db = $database->getConnection();  //gọi đến phương thức getConnection để lấy kết nối csdl

    $email = mysqli_real_escape_string($db,$_POST['email']); // xử lý sql injection
    $password = mysqli_real_escape_string($db,$_POST['password']); // xử lý sql injection
    
    $sql = "SELECT * FROM users WHERE email = '" . $email . "' AND password = '" . $password . "' LIMIT 1";
    $result = mysqli_query($db, $sql); // thực hiện truy vấn
    $itemCount = $result->num_rows; //trả về số hàng nhận được

    if($itemCount < 1) {
        echo json_encode(array('error' => 'Invalid User'));
    }else {
        $row = $result->fetch_assoc();  // gán kết quả vào một mảng kết hợp
        $email = $row['email'];
		
        // phần header mang theo thuật toán và loại
		$headers = array('alg'=>'HS256','typ'=>'JWT');
        // phần payload mang theo dữ liệu và thời gian hiệu lực
		$payload = array('email'=>$email,'password'=>$password, 'exp'=>(time() + 600));
        // thực hiện tryền dữ liệu vào hàm tạo jwt
		$jwt = generate_jwt($headers, $payload);
		echo json_encode(array('jwt' => $jwt));
    }
}else {
    echo "Can not get";
}