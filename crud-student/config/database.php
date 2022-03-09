<?php
class Database {
    public $db;

    // lấy kết nối cơ sở dữ liệu
    public function getConnection() {
        $this->db = null;
        try {
            // kết nối đến mysql server (theo cách hướng đối tượng(Object oriented style))
            $this->db = new mysqli('localhost', 'root', '', 'student');

        } catch (Exception $e) { //xử lý, bắt lỗi ngoại lệ (exception)
            echo "Database could not be connected: " . $e->getMessage(); //hiển thị lỗi
        }
        return $this->db;
    }
}

?>
