$(document).ready(function () {
  var form = new Validator("#form-1");
  // Gọi hàm khi submit
  form.onSubmit = function (formData) {
    submitHandle(formData);
  };

  const forgotPage = $(".forgot-page").click(function () {
    alert("your acount was loss");
  });
});
// hàm xử lý submit form
function submitHandle(value) {
  //call api
  $.ajax({
    method: "POST",
    url: BASE_URL + "/project/student-project/crud-student/api/users/login.php",
    data: {
      email: value.email,
      password: value.password,
    },
    // thực thi nếu thành công
    success: function (data) {
      localStorage.setItem("token", data.jwt);
      if (data.jwt) {
        alert("Sign In Success");
        $(location).attr(
          "href",
          "../../../../student-project/views/showPage.html"
        );
      } else {
        alert("Email or Password Wrong!");
      }
    },
    // hiển thị lỗi
    error: function (err) {
      alert("Email or Password Wrong!");
    },
  });
}
