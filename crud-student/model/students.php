<?php
class Students {
    // connection
    private $db;
    // table
    private $db_table = "students";
    //columns thuộc tính của đối tượng
    public $id;
    public $profile_code;
    public $student_code;
    public $firstname;
    public $lastname;
    public $sex;
    public $date_of_birth;
    public $place_of_birth;
    public $race;
    public $religion;
    public $phone;
    public $email;
    public $personal_email;
    public $address;
    public $identity_number;
    public $student_status;
    public $note;

    // kết nối cơ sở dữ liệu
    public function __construct($db) {
        $this->db = $db;
    }

    // GET ALL
    public function getStudents() {
        // lấy tất cả dữ liệu từ bảng
        $sqlQuery = "SELECT 
            id, profile_code, student_code, firstname, lastname, sex, 
            date_of_birth, place_of_birth, race, religion, phone, email, personal_email, 
            address, identity_number, student_status, note FROM ". $this->db_table . "
        ";
        $this->result = $this->db->query($sqlQuery); // thực hiện truy vấn
        return $this->result;
    }

    // CREATE student
    public function createStudent() {
        // clean data (chuyển kí tự đặc biệt => html entities và loại bỏ thẻ tag html & php)
        $this -> profile_code = htmlspecialchars(strip_tags($_POST['profile_code']));
        $this -> student_code = htmlspecialchars(strip_tags($_POST['student_code']));
        $this -> firstname = htmlspecialchars(strip_tags($_POST['firstname']));
        $this -> lastname = htmlspecialchars(strip_tags($_POST['lastname']));
        $this -> sex = htmlspecialchars(strip_tags($_POST['sex']));
        $this -> date_of_birth = htmlspecialchars(strip_tags($_POST['date_of_birth']));
        $this -> place_of_birth = htmlspecialchars(strip_tags($_POST['place_of_birth']));
        $this -> race = htmlspecialchars(strip_tags($_POST['race']));
        $this -> religion = htmlspecialchars(strip_tags($_POST['religion']));
        $this -> phone = htmlspecialchars(strip_tags($_POST['phone']));
        $this -> email = htmlspecialchars(strip_tags($_POST['email']));
        $this -> personal_email = htmlspecialchars(strip_tags($_POST['personal_email']));
        $this -> address = htmlspecialchars(strip_tags($_POST['address']));
        $this -> identity_number = htmlspecialchars(strip_tags($_POST['identity_number']));
        $this -> student_status = htmlspecialchars(strip_tags($_POST['student_status']));
        $this -> note = htmlspecialchars(strip_tags($_POST['note']));

        // set, bind data
        $sqlQuery = "INSERT INTO ".$this->db_table." 
            SET profile_code = '".$this->profile_code."',   
                student_code = '".$this->student_code."',   
                firstname = '".$this->firstname."',   
                lastname = '".$this->lastname."',   
                sex = '".$this->sex."',   
                date_of_birth = '".$this->date_of_birth."',   
                place_of_birth = '".$this->place_of_birth."',   
                race = '".$this->race."',   
                religion = '".$this->religion."',
                phone = '".$this->phone."',
                email = '".$this->email."',
                personal_email = '".$this->personal_email."',
                address = '".$this->address."',
                identity_number = '".$this->identity_number."',
                student_status = '".$this->student_status."',
                note = '".$this->note."'
        ";
        // thực hiện truy vấn (execute)
        $this->db->query($sqlQuery);
        // kiểm tra số dòng bị ảnh hưởng bởi truy vấn
        if ($this->db->affected_rows > 0) {
            return true;
        }else {
            return false;
        }
    }

    // GET single student
    public function getSingleStudent() {
        // lấy dữ liệu từ bảng theo trường id
        $sqlQuery = "SELECT 
            id, profile_code, student_code, firstname, lastname, sex, 
            date_of_birth, place_of_birth, race, religion, phone, email, 
            personal_email, address, identity_number, student_status, note 
        FROM ". $this->db_table ." WHERE id = ".$this->id;
        // thực thi truy vấn câu lệnh sẽ trả về 1 bản ghi chứa dữ liệu
        $record = $this->db->query($sqlQuery);
        // gán kết quả vào 1 mảng kết hợp
        $dataRow = $record->fetch_assoc();
        
        // set values to object properties
        $this->profile_code = $dataRow['profile_code'];
        $this->student_code = $dataRow['student_code'];
        $this->firstname = $dataRow['firstname'];
        $this->lastname = $dataRow['lastname'];
        $this->date_of_birth = $dataRow['date_of_birth'];
        $this->place_of_birth = $dataRow['place_of_birth'];
        $this->race = $dataRow['race'];
        $this->religion = $dataRow['religion'];
        $this->sex = $dataRow['sex'];
        $this->email = $dataRow['email'];
        $this->phone = $dataRow['phone'];
        $this->personal_email = $dataRow['personal_email'];
        $this->address = $dataRow['address'];
        $this->identity_number = $dataRow['identity_number'];
        $this->student_status = $dataRow['student_status'];
        $this->note = $dataRow['note'];
    }

    // UPDATE
    public function updateStudent() {
        // clean data (chuyển kí tự đặc biệt => html entities và loại bỏ thẻ tag html & php)
        $this -> profile_code = htmlspecialchars(strip_tags($this->profile_code));
        $this -> student_code = htmlspecialchars(strip_tags($this->student_code));
        $this -> firstname = htmlspecialchars(strip_tags($this->firstname));
        $this -> lastname = htmlspecialchars(strip_tags($this->lastname));
        $this -> sex = htmlspecialchars(strip_tags($this->sex));
        $this -> date_of_birth = htmlspecialchars(strip_tags($this->date_of_birth));
        $this -> place_of_birth = htmlspecialchars(strip_tags($this->place_of_birth));
        $this -> race = htmlspecialchars(strip_tags($this->race));
        $this -> religion = htmlspecialchars(strip_tags($this->religion));
        $this -> phone = htmlspecialchars(strip_tags($this->phone));
        $this -> email = htmlspecialchars(strip_tags($this->email));
        $this -> personal_email = htmlspecialchars(strip_tags($this->personal_email));
        $this -> address = htmlspecialchars(strip_tags($this->address));
        $this -> identity_number = htmlspecialchars(strip_tags($this->identity_number));
        $this -> student_status = htmlspecialchars(strip_tags($this->student_status));
        $this -> note = htmlspecialchars(strip_tags($this->note));

        // cập nhật dữ liệu trong bảng tại trường id
        $sqlQuery = "UPDATE ".$this->db_table." 
            SET profile_code = '".$this->profile_code."',   
                student_code = '".$this->student_code."',   
                firstname = '".$this->firstname."',   
                lastname = '".$this->lastname."',   
                sex = '".$this->sex."',   
                date_of_birth = '".$this->date_of_birth."',   
                place_of_birth = '".$this->place_of_birth."',   
                race = '".$this->race."',   
                religion = '".$this->religion."',
                phone = '".$this->phone."',
                email = '".$this->email."',
                personal_email = '".$this->personal_email."',
                address = '".$this->address."',
                identity_number = '".$this->identity_number."',
                student_status = '".$this->student_status."',
                note = '".$this->note."' 
            WHERE id = " .$this->id;
        
        //thực hiện câu lệnh truy vấn
        $this->db->query($sqlQuery);
        if ($this->db->affected_rows > 0) {
            return true;
        }else {
            return false;
        }
    }

    // DELETE
    function deleteStudent() {
        // xóa dữ liệu trong bảng theo id
        $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ".$this->id;
        //thực hiện câu lệnh truy vấn
        $this->db->query($sqlQuery);
        if ($this->db->affected_rows > 0) {
            return true;
        }else {
            return false;
        }
    }

    // hiển thị trang đầu tiên của bảng, chứa 5 bản ghi
    function readFirstPage() {
        // số bản ghi trên 1 trang
        $row_per_page = 5;
        $sqlQuery = "SELECT * FROM students LIMIT $row_per_page";
        $data = "SELECT * FROM students";
        
        $records = $this->db->query($data);
        $result = $this->db->query($sqlQuery);

        $countItems =  $records->num_rows;
        $countRowPerPage = $result->num_rows;

        $pages = ceil($countItems/$row_per_page);
        $arrItems = array();

        if($countRowPerPage > 0) {
            while($row = $result->fetch_assoc()){
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
                array_push($arrItems,$records);
            }
            $arr = ['msg'=>'success','body'=>$arrItems,'pages'=>$pages,'status'=>201];
            echo json_encode($arr);
        }else {
            $arr = ['msg'=>'error !!!','body'=>$arrItems,'pages'=>$pages,'status'=>201];
            echo json_encode($arr);
        }
    }

    // hiển thị các bản ghi mỗi khi người dùng call api, mỗi lần lấy 5 bản ghi
    function paginationPage() {
        $row_per_page = 5;
        if(isset($_GET['page'])) {
            $page = $_GET['page'];
            $start = ($page - 1) * $row_per_page;
            $sqlQuery = "SELECT * FROM students LIMIT $start, $row_per_page";

            $result = $this->db->query($sqlQuery);

            $countPerPage = $result -> num_rows;

            $pages = ceil($countPerPage / $row_per_page);
            $arrItems = array();

            if($countPerPage > 0) {
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
                    array_push($arrItems,$records);
                }
                $arr = ['msg'=>'success','body'=>$arrItems,'pages'=>$pages,'status'=>201];
                echo json_encode($arr);
            }else {
                $arr = ['msg'=>'error !!!','body'=>$arrItems,'pages'=>$pages,'status'=>201];
                echo json_encode($arr);
            }
        }else {
            $defaultPage = 1;
            $sqlQuery = "SELECT * FROM students LIMIT $defaultPage, $row_per_page";

            $result = $this->db->query($sqlQuery);

            $countPerPage = $result -> num_rows;

            $pages = ceil($countPerPage / $row_per_page);
            $arrItems = array();
            if($countPerPage > 0) {
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
                    array_push($arrItems,$records);
                }
                $arr = ['msg'=>'success','body'=>$arrItems,'pages'=>$pages,'status'=>201];
                echo json_encode($arr);
            }else {
                $arr = ['msg' => 'Lấy ra thất bại  !!!', 'status' => 400];
                echo json_encode($arr);
            }
        }
    }
}
