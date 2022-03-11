$(document).ready(function () {
  //chuyển trang thêm mới
  $("#button__redirect-add").click(() => {
    window.location.assign("./addPage.html");
  });
  // chuyển về trang chính
  $("#button__redirect-home").click(() => {
    window.location.assign("./showPage.html");
  });
  // logout
  $("#button__redirect-logout").click(() => {
    if (confirm("Do you want logout?") == true) {
      localStorage.removeItem("token");
      window.location.assign("./login.html");
    }
  });
  // get token from local storage
  const token = localStorage.getItem("token");
  const check = isTokenExpired(token);
  // check hiệu lực token
  if (!check) {
    //submit form
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
            BASE_URL +
            "/project/student-project/crud-student/api/students/filters.php?lastname=" +
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
    //call api
    $.ajax({
      type: "GET",
      url:
        BASE_URL +
        "/project/student-project/crud-student/api/students/read.php",
      beforeSend: function (request) {
        request.setRequestHeader(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
      },
      dataType: "json",
      success: function (data) {
        //render dữ liệu vào html
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
        // render pagination
        const pages = data.pages;
        for (var i = 1; i <= pages; i++) {
          $(".pagination").append(
            $(
              '<li id="pagination-' +
                i +
                '" class="btn page-item">' +
                i +
                "</li>"
            )
          );
        }
      },
    }) // delete action
      .then(() => {
        $(".delete-btn").click(function () {
          if (confirm("Do you want delete ?") == true) {
            const id = this.id.slice(11);
            handleDelete(id);
          } else {
          }
        });
      }) //update action
      .then(() => {
        $(".update-btn").click(function () {
          if (confirm("Do you want update ?") == true) {
            const id = this.id.slice(11);
            handleUpdate(id);
          } else {
          }
        });
      }) //css và xử lý action click chuyển pagination
      .then(() => {
        $(".pagination li:nth-child(1)")
          .css("color", "#ff0084")
          .css("border", "1px solid #ddd");
        $(".pagination .page-item").click(function () {
          var page_num = this.id.slice(11);
          $(".pagination li").css("border", "none").css("color", "#0063DC");
          $(this).css("color", "#ff0084").css("border", "1px solid #ddd");
          //call api
          $.ajax({
            url:
              BASE_URL +
              "/project/student-project/crud-student/api/students/pagination.php?page=" +
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
              $("tbody tr").remove();
              //render dữ liệu vào html
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
            // delete action
            $(".delete-btn").click(function () {
              if (confirm("Do you want delete ?") == true) {
                const id = this.id.slice(11);
                handleDelete(id);
              } else {
              }
            });

            $(".update-btn").click(function () {
              //update action
              if (confirm("Do you want update ?") == true) {
                const id = this.id.slice(11);
                handleUpdate(id);
              } else {
              }
            });
          });
        });
      });
    //hàm xử lý update
    const handleUpdate = (id) => {
      $(location).attr(
        "href",
        "../../../../student-project/views/update.html?id=" + id
      );
    };
    // hamd xử lý delete
    const handleDelete = (id) => {
      $.ajax({
        method: "GET",
        url:
          BASE_URL +
          "/project/student-project/crud-student/api/students/delete.php?id=" +
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
            "../../../../student-project/views/showPage.html"
          );
        },
        error: function (err) {
          alert("loi r");
        },
      });
    };
  } else {
    alert("Login session expired! Please relogin");
    window.location.assign("./login.html");
  }
});
