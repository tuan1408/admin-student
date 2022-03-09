$(document).ready(function () {
  var form = new Validator("#form-update");
  form.onSubmit = function (formData) {
    updateStudent(formData);
  };

  $("#button-cancle").click(function () {
    $(location).attr(
      "href",
      "../../../../student-project/views-test/showPage.html"
    );
  });

  let url = new URL(window.location.href);
  // lấy endpoint page của url
  $id = url.searchParams.get("id");
  const updateStudent = (value) => {
    $sex = $("#sex option:selected").val();
    $student_status = $("#student_status option:selected").val();
    $.ajax({
      url:
        "http://localhost:8080/project/student-project/crud-student/api/students/update.php?id=" +
        $id,
      type: "POST",
      beforeSend: function (request) {
        request.setRequestHeader(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
      },
      data: {
        id: $id,
        profile_code: value.profile_code,
        student_code: value.student_code,
        firstname: value.firstname,
        lastname: value.lastname,
        sex: $sex == 0 ? "Nam" : "Nu",
        date_of_birth: value.date_of_birth,
        place_of_birth: value.place_of_birth,
        race: value.race,
        religion: value.religion,
        email: value.email,
        personal_email: value.personal_email,
        identity_number: value.identity_number,
        note: value.note,
        student_status:
          $student_status == 0 ? "Da tot nghiep" : "Chua tot nghiep",
        address: value.address,
        phone: value.phone,
      },
      dataType: "json",

      success: function (data) {
        alert("success");
        $(location).attr(
          "href",
          "../../../../student-project/views-test/showPage.html"
        );
      },
      error: function (err) {
        alert("err", err);
      },
    });
  };
});
