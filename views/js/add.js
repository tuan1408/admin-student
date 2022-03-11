$(document).ready(function () {
  var form = new Validator("#form-add");

  // get token from local storage
  const token = localStorage.getItem("token");
  // check hiệu lực token
  if (!isTokenExpired(token)) {
    //submit form
    form.onSubmit = function (formData) {
      addStudent(formData);
    };
    //cancle action
    $("#button-cancle").click(function () {
      $(location).attr(
        "href",
        "../../../../student-project/views/showPage.html"
      );
    });
  } else {
    alert("Login session expired! Please relogin");
    window.location.assign("./login.html");
  }
});
// hàm tạo student
function addStudent(value) {
  console.log(12);
  var options = {};
  (options.url =
    BASE_URL + "/project/student-project/crud-student/api/students/create.php"),
    (options.method = "POST"),
    (options.beforeSend = function (request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
    }), // dữ liệu mang đi
    (options.data = {
      profile_code: value.profile_code,
      student_code: value.student_code,
      firstname: value.firstname,
      lastname: value.lastname,
      sex: value.sex == 0 ? "Nam" : "Nu",
      date_of_birth: value.date_of_birth,
      place_of_birth: value.place_of_birth,
      race: (value.race = ""),
      religion: (value.religion = ""),
      phone: value.phone,
      email: value.email,
      personal_email: value.personal_email,
      address: value.address,
      identity_number: value.identity_number,
      student_status: value.student_status,
      note: value.note,
    }),
    (options.success = function (data) {
      console.log(data);
    }),
    (options.error = function () {
      alert("Add new student success");
      $(location).attr(
        "href",
        "../../../../student-project/views/showPage.html"
      );
    }),
    $.ajax(options);
}
