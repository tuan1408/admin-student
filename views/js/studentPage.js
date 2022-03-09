console.log(123);
$(document).ready(function () {
  getPagination("#table-id");
  function getPagination(table) {
    var lastPage = 1;

    $("#maxRows")
      .on("change", function (evt) {
        $(".paginationprev").html(""); // reset pagination

        lastPage = 1;
        $(".pagination").find("li").slice(1, -1).remove();
        var trnum = 0; // reset tr counter
        var maxRows = parseInt($(this).val()); // get Max Rows from select option

        if (maxRows == 5000) {
          $(".pagination").hide();
        } else {
          $(".pagination").show();
        }

        var totalRows = $(table + " tbody tr").length; // numbers of rows
        $(table + " tr:gt(0)").each(function () {
          // each TR in  table and not the header
          trnum++; // Start Counter
          if (trnum > maxRows) {
            // if tr number gt maxRows

            $(this).hide(); // fade it out
          }
          if (trnum <= maxRows) {
            $(this).show();
          } // else fade in Important in case if it ..
        }); //  was fade out to fade it in
        if (totalRows > maxRows) {
          // if tr total rows gt max rows option
          var pagenum = Math.ceil(totalRows / maxRows);
          //	numbers of pages
          for (var i = 1; i <= pagenum; ) {
            // for each page append pagination li
            $(".pagination #prev")
              .before(
                '<li class="page-item" data-page="' +
                  i +
                  '"> <span class="page-link" >' +
                  i++ +
                  "<span ></span></span></li>"
              )
              .show();
          } // end for i
        } // end if row count > max rows
        $('.pagination [data-page="1"]').addClass("active"); // add active class to the first li
        $(".pagination li").on("click", function (evt) {
          // on click each page
          evt.stopImmediatePropagation();
          evt.preventDefault();
          var pageNum = $(this).attr("data-page"); // get it's number

          var maxRows = parseInt($("#maxRows").val()); // get Max Rows from select option

          if (pageNum == "prev") {
            if (lastPage == 1) {
              return;
            }
            pageNum = --lastPage;
          }
          if (pageNum == "next") {
            if (lastPage == $(".pagination li").length - 2) {
              return;
            }
            pageNum = ++lastPage;
          }
          lastPage = pageNum;
          var trIndex = 0; // reset tr counter
          $(".pagination li").removeClass("active"); // remove active class from all li
          $('.pagination [data-page="' + lastPage + '"]').addClass("active"); // add active class to the clicked
          // $(this).addClass('active');					// add active class to the clicked
          limitPagging();
          $(table + " tr:gt(0)").each(function () {
            // each tr in table not the header
            trIndex++; // tr index counter
            if (
              trIndex > maxRows * pageNum ||
              trIndex <= maxRows * pageNum - maxRows
            ) {
              $(this).hide();
            } else {
              $(this).show();
            } //else fade in
          }); // end of for each tr in table
        }); // end of on click pagination list
        limitPagging();
      })
      .val(5)
      .change();
    // end of on select change
    // END OF PAGINATION
  }

  function limitPagging() {
    // alert($('.pagination li').length)

    if ($(".pagination li").length > 7) {
      if ($(".pagination li.active").attr("data-page") <= 3) {
        $(".pagination li:gt(5)").hide();
        $(".pagination li:lt(5)").show();
        $('.pagination [data-page="next"]').show();
      }
      if ($(".pagination li.active").attr("data-page") > 3) {
        $(".pagination li:gt(0)").hide();
        $('.pagination [data-page="next"]').show();
        for (
          let i = parseInt($(".pagination li.active").attr("data-page")) - 2;
          i <= parseInt($(".pagination li.active").attr("data-page")) + 2;
          i++
        ) {
          $('.pagination [data-page="' + i + '"]').show();
        }
      }
    }
  }

  $(function () {
    // Just to append id number for each row
    $("table tr:eq(0)").prepend("<th> ID </th>");

    var id = 0;

    $("table tr:gt(0)").each(function () {
      id++;
      $(this).prepend("<td>" + id + "</td>");
    });
  });

  $("#form-search").submit(function (e) {
    e.preventDefault();

    const name = $("#name").val();
    const maso = $("#maso").val();
    const masinhvien = $("#masinhvien").val();

    if ((name, maso, masinhvien)) {
      console.log({
        name,
        maso,
        masinhvien,
      });
    }
  });

  $("#button__redirect-add").click(() => {
    window.location.assign("./addPage.html");
  });

  var options = {};
  options.url =
    "http://localhost:8080/project/student-project/crud-student/api/users/read.php";
  options.type = "GET";
  options.beforeSend = function (request) {
    request.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    console.log(localStorage.getItem("token"));
  };
  options.dataType = "json";
  options.success = function (data) {
    console.log(data);
    var no = 1;
    $.each(data.students, function (key, value) {
      $("tbody").append(
        "<tr class='table-item'><td>" +
          no++ +
          "</td>" +
          "<td>" +
          value.profile_code +
          "</td>" +
          "<td>" +
          value.student_code +
          "</td>" +
          "<td>" +
          value.firstname +
          "</td>" +
          "<td>" +
          value.lastname +
          "</td>" +
          "<td>" +
          value.gender +
          "</td>" +
          "<td>" +
          value.date_of_birth +
          "</td>" +
          "<td>" +
          value.place_of_birth +
          "</td>" +
          "<td>" +
          value.race +
          "</td>" +
          "<td>" +
          value.phone +
          "</td>" +
          "<td>" +
          value.email +
          "</td>" +
          "<td>" +
          value.personal_email +
          "</td>" +
          "<td>" +
          value.address +
          "</td>" +
          "<td>" +
          value.identity_number +
          "</td>" +
          "<td>" +
          value.student_status +
          "</td>" +
          "<td>" +
          value.note +
          "</td> +</tr>"
      );
    });
  };
  $.ajax(options);
});
