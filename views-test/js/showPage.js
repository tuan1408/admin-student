$(document).ready(function () {
  $("#button__redirect-add").click(() => {
    window.location.assign("./addPage.html");
  });
  $("#button__redirect-home").click(() => {
    window.location.assign("./showPage.html");
  });
  $("#button__redirect-logout").click(() => {
    if (confirm("Do you want logout?") == true) {
      localStorage.removeItem("token");
      window.location.assign("./login.html");
    }
  });

  $("#form-search").submit(function (e) {
    e.preventDefault();

    const lastname = $("#lastname").val();
    const profile_code = $("#profile_code").val();
    const student_code = $("#student_code").val();

    if (lastname || profile_code || student_code) {
      const refresh =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?lastname=" +
        lastname +
        "&profile_code=" +
        profile_code +
        "&student_code=" +
        student_code;
      window.history.pushState({ path: refresh }, "", refresh);

      $.ajax({
        type: "GET",
        url:
          "http://localhost:8080/project/student-project/crud-student/api/students/filters.php?lastname=" +
          lastname +
          "&profile_code=" +
          profile_code +
          "&student_code=" +
          student_code +
          "",
        beforeSend: function (request) {
          request.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
          );
        },
        success: function (data) {
          $("#table-id tbody tr").remove();
          if (data.rowCount > 0) {
            $("#notification").html(
              "<h3>Found " + data.rowCount + " record</h3>"
            );
            $.each(data.body, function (key, val) {
              $("#table-id tbody").append(
                "<tr>" +
                  "<td data-title = 'STT' >" +
                  val.id +
                  "</td>" +
                  "<td data-title = 'Ma ho so'>" +
                  val.profile_code +
                  "</td>" +
                  "<td data-title = 'Ma sinh vien'>" +
                  val.student_code +
                  "</td>" +
                  "<td data-title = 'Ho dem'>" +
                  val.firstname +
                  "</td>" +
                  "<td data-title = 'Ten'>" +
                  val.lastname +
                  "</td>" +
                  "<td data-title = 'Gioi tinh'>" +
                  val.sex +
                  "</td>" +
                  "<td data-title = 'Ngay sinh'>" +
                  val.date_of_birth +
                  "</td>" +
                  "<td data-title = 'So dien thoai'>" +
                  val.phone +
                  "</td>" +
                  "<td data-title = 'Email'>" +
                  val.email +
                  "</td>" +
                  "<td data-title = 'Noi sinh'>" +
                  val.place_of_birth +
                  "</td>" +
                  "<td data-title = 'CCCD'>" +
                  val.identity_number +
                  "</td>" +
                  "<td data-title = 'Dia chi'>" +
                  val.address +
                  "</td>" +
                  "<td data-title = 'Hanh dong' class='action-btn'>" +
                  `<button type='button' class='mt-2 btn btn-primary border-0 outline-0 update-btn' id='delete-btn-${val.id}'><i class='fa-solid fa-pen-to-square'></i></button>` +
                  `<button type='button' class='mt-2 btn btn-danger border-0 outline-0 delete-btn' id='delete-btn-${val.id}'><i class='fa-solid fa-trash-can'></i></button>` +
                  "</td>" +
                  "</tr>"
              );
            });
          } else {
            $("#notification").html("<h3>Not Found record</h3>");
          }
          $(".pagination").remove();
        },
        error: function (err) {
          $(".pagination").remove();
          $("#notification").html("<h3>" + err.msg + "</h3>");
        },
      })
        .then(() => {
          $(".delete-btn").click(function () {
            if (confirm("Do you want delete ?") == true) {
              const id = this.id.slice(11);
              handleDelete(id);
            } else {
            }
          });
        })
        .then(() => {
          $(".update-btn").click(function () {
            if (confirm("Do you want update ?") == true) {
              const id = this.id.slice(11);
              handleUpdate(id);
            } else {
            }
          });
        });
    }
  });

  $.ajax({
    type: "GET",
    url: "http://localhost:8080/project/student-project/crud-student/api/students/read.php",
    beforeSend: function (request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
    },
    dataType: "json",
    success: function (data) {
      $.each(data.body, function (key, val) {
        $("#table-id").append(
          "<tr>" +
            "<td data-title = 'STT' >" +
            val.id +
            "</td>" +
            "<td data-title = 'Ma ho so'>" +
            val.profile_code +
            "</td>" +
            "<td data-title = 'Ma sinh vien'>" +
            val.student_code +
            "</td>" +
            "<td data-title = 'Ho dem'>" +
            val.firstname +
            "</td>" +
            "<td data-title = 'Ten'>" +
            val.lastname +
            "</td>" +
            "<td data-title = 'Gioi tinh'>" +
            val.sex +
            "</td>" +
            "<td data-title = 'Ngay sinh'>" +
            val.date_of_birth +
            "</td>" +
            "<td data-title = 'So dien thoai'>" +
            val.phone +
            "</td>" +
            "<td data-title = 'Email'>" +
            val.email +
            "</td>" +
            "<td data-title = 'Noi sinh'>" +
            val.place_of_birth +
            "</td>" +
            "<td data-title = 'CCCD'>" +
            val.identity_number +
            "</td>" +
            "<td data-title = 'Dia chi'>" +
            val.address +
            "</td>" +
            "<td data-title = 'Hanh dong' class='action-btn'>" +
            `<button type='button' class='btn btn-primary border-0 outline-0 update-btn' id='delete-btn-${val.id}'><i class='fa-solid fa-pen-to-square'></i></button>` +
            `<button type='button' class='mt-2 btn btn-danger border-0 outline-0 delete-btn' id='delete-btn-${val.id}'><i class='fa-solid fa-trash-can'></i></button>` +
            "</td>" +
            "</tr>"
        );
      });

      const pages = data.pages;
      for (var i = 1; i <= pages; i++) {
        $(".pagination").append(
          $(
            '<li id="pagination-' + i + '" class="btn page-item">' + i + "</li>"
          )
        );
      }
    },
  })
    .then(() => {
      $(".delete-btn").click(function () {
        if (confirm("Do you want delete ?") == true) {
          const id = this.id.slice(11);
          handleDelete(id);
        } else {
        }
      });
    })
    .then(() => {
      $(".update-btn").click(function () {
        if (confirm("Do you want update ?") == true) {
          const id = this.id.slice(11);
          handleUpdate(id);
        } else {
        }
      });
    })
    .then(() => {
      $(".pagination li:nth-child(1)")
        .css("color", "#ff0084")
        .css("border", "1px solid #ddd");
      $(".pagination .page-item").click(function () {
        var page_num = this.id.slice(11);
        $(".pagination li").css("border", "none").css("color", "#0063DC");
        $(this).css("color", "#ff0084").css("border", "1px solid #ddd");

        $.ajax({
          url:
            "http://localhost:8080/project/student-project/crud-student/api/students/pagination.php?page=" +
            page_num, // gửi dữ liệu sang trang read.php
          method: "GET",
          dataType: "json",
          beforeSend: function (request) {
            request.setRequestHeader(
              "Authorization",
              "Bearer " + localStorage.getItem("token")
            );
          },
          data: {}, // dữ liệu sẽ dc gửi
          success: function (data) {
            // hàm thực thi khi nhận dữ liệu được từ server
            $("tbody tr").remove();

            $.each(data.body, function (key, val) {
              $("#table-id tbody").append(
                "<tr>" +
                  "<td data-title = 'STT' >" +
                  val.id +
                  "</td>" +
                  "<td data-title = 'Ma ho so'>" +
                  val.profile_code +
                  "</td>" +
                  "<td data-title = 'Ma sinh vien'>" +
                  val.student_code +
                  "</td>" +
                  "<td data-title = 'Ho dem'>" +
                  val.firstname +
                  "</td>" +
                  "<td data-title = 'Ten'>" +
                  val.lastname +
                  "</td>" +
                  "<td data-title = 'Gioi tinh'>" +
                  val.sex +
                  "</td>" +
                  "<td data-title = 'Ngay sinh'>" +
                  val.date_of_birth +
                  "</td>" +
                  "<td data-title = 'So dien thoai'>" +
                  val.phone +
                  "</td>" +
                  "<td data-title = 'Email'>" +
                  val.email +
                  "</td>" +
                  "<td data-title = 'Noi sinh'>" +
                  val.place_of_birth +
                  "</td>" +
                  "<td data-title = 'CCCD'>" +
                  val.identity_number +
                  "</td>" +
                  "<td data-title = 'Dia chi'>" +
                  val.address +
                  "</td>" +
                  "<td data-title = 'Hanh dong' class='action-btn'>" +
                  `<button type='button' class='btn btn-primary border-0 outline-0 update-btn' id='delete-btn-${val.id}'><i class='fa-solid fa-pen-to-square'></i></button>` +
                  `<button type='button' class='mt-2 btn btn-danger border-0 outline-0 delete-btn' id='delete-btn-${val.id}'><i class='fa-solid fa-trash-can'></i></button>` +
                  "</td>" +
                  "</tr>"
              );
            });
          },
        }).then(() => {
          $(".delete-btn").click(function () {
            if (confirm("Do you want delete ?") == true) {
              const id = this.id.slice(11);
              handleDelete(id);
            } else {
            }
          });

          $(".update-btn").click(function () {
            if (confirm("Do you want update ?") == true) {
              const id = this.id.slice(11);
              handleUpdate(id);
            } else {
            }
          });
        });
      });
    });

  const handleUpdate = (id) => {
    $(location).attr(
      "href",
      "../../../../student-project/views-test/update.html?id=" + id
    );
  };

  const handleDelete = (id) => {
    $.ajax({
      method: "GET",
      url:
        "http://localhost:8080/project/student-project/crud-student/api/students/delete.php?id=" +
        id,
      beforeSend: (request) => {
        request.setRequestHeader(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
      },
      success: function (data) {
        alert("Delete success");
        $(location).attr(
          "href",
          "../../../../student-project/views-test/showPage.html"
        );
      },
      error: function (err) {
        alert("loi r");
      },
    });
  };
});
