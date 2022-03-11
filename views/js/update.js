$(document).ready(function () {
  // get token from local storage
  const token = localStorage.getItem("token");
  //check hiệu lực token
  if (!isTokenExpired(token)) {
    var form = new Validator("#form-update");
    // form submit
    form.onSubmit = function (formData) {
      updateStudent(formData);
    };
    //cancle action
    $("#button-cancle").click(function () {
      $(location).attr(
        "href",
        "../../../../student-project/views/showPage.html"
      );
    });

    let url = new URL(window.location.href);
    // lấy endpoint page của url
    $id = url.searchParams.get("id");
    // hàm update student
    const updateStudent = (value) => {
      $sex = $("#sex option:selected").val();
      $student_status = $("#student_status option:selected").val();
      $.ajax({
        //call api
        url:
          BASE_URL +
          "/project/student-project/crud-student/api/students/update.php?id=" +
          $id,
        type: "POST",
        beforeSend: function (request) {
          request.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
          );
        },
        data: {
          // dữ liệu gửi đi
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
        // thành công sẽ chuyển trang
        success: function (data) {
          alert("success");
          $(location).attr(
            "href",
            "../../../../student-project/views/showPage.html"
          );
        },
        error: function (err) {
          alert("err", err);
        },
      });
    };
  } else {
    alert("Login session expired! Please relogin");
    window.location.assign("./login.html");
  }
});
