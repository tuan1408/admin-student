$(document).ready(function () {
  let url = new URL(window.location.href);
  // lấy endpoint page của url
  $id = url.searchParams.get("id");
  if ($id) {
    $.ajax({
      url:
        "http://localhost:8080/project/student-project/crud-student/api/students/single_read.php?id=" +
        $id,
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
      },
      data: {},
      dataType: "json",
      success: function (data) {
        $("#profile_code").val(data.profile_code);
        $("#student_code").val(data.student_code);
        $("#firstname").val(data.firstname);
        $("#lastname").val(data.lastname);
        $("#sex").val(data.sex == "Nam" ? 0 : 1);
        $("#date_of_birth").val(data.date_of_birth);
        $("#place_of_birth").val(data.place_of_birth);
        $("#address").val(data.address);
        $("#identity_number").val(data.identity_number);
        $("#email").val(data.email);
        $("#phone").val(data.phone);
        $("#personal_email").val(data.personal_email);
        $("#student_status").val(
          data.student_status == "Da tot nghiep" ? 0 : 1
        );
        $("#note").val(data.note);
        $("#race").val(data.race);
        $("#religion").val(data.religion);
      },
    });
  }
});
