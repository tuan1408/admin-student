<?php

// hàm mã hóa (encode)
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '='); //loại bỏ '=', thay thế '+' thành '-_' 
}
// hàm tạo jwt
function generate_jwt($headers, $payload, $secret = 'secret') {
    //header được base64url mã hóa (encode) tạo thành phần đầu của JWT
    $headers_encoded = base64url_encode(json_encode($headers)); //contain type of token and signing algorithm
    //payload được base64url mã hóa (encode) tạo thành phần thứ hai của JWT
    $payload_encoded = base64url_encode(json_encode($payload)); // chứa xác thực quyền sở hữu (registered, public, and private)
    // tạo chữ kí (hash_hmac: là hàm băm)
    $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true); //$secret is my key
    //signature được base64url mã hóa (encode)
    $signature_encoded = base64url_encode($signature);
	// kết hợp tất cả (header, pyaload, signature) tạo thành jwt
	$jwt = "$headers_encoded.$payload_encoded.$signature_encoded";
	
	return $jwt;
}

// validate
function is_jwt_valid($jwt, $secret = 'secret') {
    //explode phân tách jwt thành 1 mảng, mỗi phần được tách bởi 1 dấu .
    $tokenParts = explode('.', $jwt);
    //phần tử đầu
	$header = base64_decode($tokenParts[0]);
    //phần tử thứ hai
	$payload = base64_decode($tokenParts[1]);
    //phần tử cuối
	$signature_provided = $tokenParts[2];

    // kiểm tra thời gian hết hạn (phải cung cấp exp claim trong jwt, nếu không sẽ lỗi)
    $expiration = json_decode($payload)->exp;
	$is_token_expired = ($expiration - time()) < 0;

    //xây dựng chữ kí dựa trên header, payload bằng secret key
    $base64_url_header = base64url_encode($header);
	$base64_url_payload = base64url_encode($payload);
    $signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
	$base64_url_signature = base64url_encode($signature);

    // xác minh chữ kí có khớp với chữ kí được tạo trong jwt không
    $is_signature_valid = (($base64_url_signature) === $signature_provided);

    if($is_token_expired || !$is_signature_valid) {
        return false;
    }else {
        return true;
    }
}
// get authorization
function get_authorization_header() {
    $headers = null;

    if (isset($_SERVER['Authorization'])) {

		$headers = trim($_SERVER["Authorization"]);

	} else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { 

		$headers = trim($_SERVER["HTTP_AUTHORIZATION"]);

	} else if (function_exists('apache_request_headers')) {
        //Tìm nạp tất cả các tiêu đề yêu cầu HTTP từ yêu cầu hiện tại
		$requestHeaders = apache_request_headers();

        // gộp 2 mảng lại với nhau, mảng 1 là key, mảng 2 là value
        // Bản sửa lỗi phía máy chủ đối với lỗi trong các phiên bản Android cũ
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
		if (isset($requestHeaders['Authorization'])) {
			$headers = trim($requestHeaders['Authorization']);
		}
	}
	
	return $headers;
}

function get_bearer_token() {
    $headers = get_authorization_header();
	
    // nhận mã thông báo truy cập từ header
    if (!empty($headers)) {
        // xử lý Regular expression
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }else {
        return null;
    }
    
}