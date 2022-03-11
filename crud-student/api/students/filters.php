<?php
header("Access-Control-Allow-Origin: *");  // tất cả domain có thể truy cập tài nguyên
header("Content-Type: application/json; charset=UTF-8");  //cố định nội dung ở dạng json
header("Access-Control-Allow-Methods: GET");  // phương thức http mà server cho phép sử dụng
header("Access-Control-Max-Age: 3600");  //thời gian hợp lệ của request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

include_once('../../config/database.php');
include_once('../../model/students.php');
include_once('../../libs/jwt.php');

// check isvalid jwt
$bearer_token = get_bearer_token();
$is_jwt_valid = is_jwt_valid($bearer_token);
if($is_jwt_valid) {
    $database = new Database();  //tạo đối tượng từ lớp Database
    $db = $database->getConnection();  //gọi đến phương thức getConnection để lấy kết nối csdl
    // get data
    $lastname = isset($_GET['lastname']) ? mysqli_real_escape_string($db,$_GET['lastname']) : "";
    $profile_code = isset($_GET['profile_code']) ? mysqli_real_escape_string($db,$_GET['profile_code']) : "";
    $student_code = isset($_GET['student_code']) ? mysqli_real_escape_string($db,$_GET['student_code']) : "";
    // check dữ liệu nếu đúng thì thực hiện truy vấn
    if($lastname != "" || $profile_code != "" || $student_code != "") {
        // lọc tất cả từ bảng students nếu giống
        $sqlQuery = "SELECT * FROM students WHERE 
            lastname  LIKE '%" .$lastname. "%' AND 
            profile_code LIKE '%" .$profile_code. "%' AND 
            student_code LIKE '%" .$student_code. "%'
        ";
        // truy vấn
        $result = $db->query($sqlQuery);
        // lấy số hàng ảnh hưởng bởi truy vấn trên
        $countRow = $result -> num_rows;
        //tạo mảng rỗng
        $arrItems = array();
        if($countRow > 0) {
            // gán vào một mảng kết hợp có thể lặp qua
            while($row = $result->fetch_assoc()) {
                $records = array(
                    "id"=>$row["id"],
                    "profile_code"=>$row["profile_code"],
                    "student_code"=>$row["student_code"],
                    "firstname"=>$row["firstname"],
                    "lastname"=>$row["lastname"],
                    "sex"=>$row["sex"],
                    "date_of_birth"=>$row["date_of_birth"],
                    "place_of_birth"=>$row["place_of_birth"],
                    "race"=>$row["race"],
                    "religion"=>$row["religion"],
                    "phone"=>$row["phone"],
                    "email"=>$row["email"],
                    "address"=>$row["address"],
                    "identity_number"=>$row["identity_number"],
                    "student_status"=>$row["student_status"],
                    "note"=>$row["note"],
                );
                //đẩy dữ liệu từ records vào arrayItems
                array_push($arrItems,$records);
            }
            $arr = ['body'=>$arrItems,'status'=>200, 'rowCount'=>$countRow];
            echo json_encode($arr);
        }else {
            $arr = ['msg' => 'Record not found !!!', 'status' => 404, 'rowCount'=>$countRow];
            echo json_encode($arr);
        }
    }
}
else {
    echo 'error';
}
