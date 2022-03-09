$(document).ready(function () {
  var form = new Validator("#form-add");

  var form = new Validator("#form-add");
  form.onSubmit = function (formData) {
    addStudent(formData);
  };

  $("#button-cancle").click(function () {
    $(location).attr(
      "href",
      "../../../../student-project/views-test/showPage.html"
    );
  });
});
function addStudent(value) {
  console.log(12);
  var options = {};
  (options.url =
    "http://localhost:8080/project/student-project/crud-student/api/students/create.php"),
    (options.method = "POST"),
    (options.beforeSend = function (request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
    }),
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
        "../../../../student-project/views-test/showPage.html"
      );
    }),
    $.ajax(options);
}
