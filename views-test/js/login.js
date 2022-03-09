$(document).ready(function () {
  var form = new Validator("#form-1");
  form.onSubmit = function (formData) {
    console.log({
      email: formData.email,
      password: formData.password,
    });

    submitHandle(formData);
  };

  const forgotPage = $(".forgot-page").click(function () {
    alert("your acount was loss");
  });
});
function submitHandle(value) {
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/project/student-project/crud-student/api/users/login.php",
    data: {
      email: value.email,
      password: value.password,
    },
    success: function (data) {
      localStorage.setItem("token", data.jwt);
      if (data.jwt) {
        alert("Sign In Success");
        $(location).attr(
          "href",
          "../../../../student-project/views-test/showPage.html"
        );
      } else {
        alert("Email or Password Wrong!");
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}
