$(document).ready(function () {
  const arr = ["name", "password"];

  arr.map((item) => {
    return inputClearMessage(inputRequiredCheck, item);
  });

  $("#form-1").submit(function (e) {
    e.preventDefault();
    const email = $.trim($("#email").val());
    const password = $.trim($("#password").val());
    let flag = true;

    if (email == "") {
      $("#error-message-email").text("Vui long nhap truong nay");
      flag = false;
    } else {
      $("#error-message-email").text("");
    }

    if (password.length <= 0) {
      $("#error-message-password").text("Ban phai nhap mat khau");
      flag = false;
    } else {
      $("#error-message-password").text("");
    }

    if (flag) {
      submitHandle();
    }

    function submitHandle() {
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/project/student-project/crud-student/api/users/login.php",
        data: {
          email: email,
          password: password,
        },
        success: function (data) {
          localStorage.setItem("token", data.jwt);
          if (data.jwt) {
            alert("Dang nhap thanh cong.");
            $(location).attr(
              "href",
              "http://localhost:8080/project/student-project/views/showPage.html"
            );
          } else {
            alert("sai tai khoan mat khau");
          }
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  });
});
