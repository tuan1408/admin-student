// import {
//   inputClearMessage,
//   inputRequiredCheck,
//   checkEmail,
//   checkValuesRequired,
//   getValue,
// } from "validate.js";

// docoment is ready
$(document).ready(function () {
  const arr = [
    "maso",
    "masinhvien",
    "prename",
    "name",
    "born",
    "status",
    "email",
    "sex",
    "date",
  ];

  arr.map((item) => {
    return inputClearMessage(inputRequiredCheck, item);
  });

  const listItems = [
    { name: "dateRange", isRequired: false },
    { name: "phone", isRequired: false },
    { name: "place", isRequired: false },
    { name: "address", isRequired: false },
    { name: "masinhvien", isRequired: true },
    { name: "prename", isRequired: true },
    { name: "maso", isRequired: true },
    { name: "name", isRequired: true },
    { name: "email", isRequired: true },
    { name: "sex", isRequired: true },
    { name: "status", isRequired: true },
    { name: "indenty", isRequired: false },
    { name: "religon", isRequired: false },
    { name: "born", isRequired: true },
    { name: "ethnic", isRequired: false },
    { name: "note", isRequired: false },
    { name: "date", isRequired: true },
  ];

  let emailItem = {
    name: "email",
    value: $.trim($("#email").val()),
    message: "email",
  };

  // validate form
  const validateForm = () => {
    checkEmail(emailItem);

    getValue(listItems).map((item, index) => {
      if (item.isRequired) {
        checkValuesRequired(item);
      }

      if (item.isRequired) {
        checkValuesRequired(item);
        return true;
      } else {
        return false;
      }
    });
  };

  // handle submit button
  $("#button-submit").click(function (e) {
    e.preventDefault();
    validateForm();
    getValue(listItems);
    console.log(
      getValue(listItems).map((item) => {
        return {
          name: item.name,
          value: item.value,
        };
      })
    );
    // if (Boolean(validateForm())) {
    //   window.location.assign("./studentPage.html");
    // }
  });

  // handle cancle button
  $("#button-cancle").click(function (e) {
    e.preventDefault();
    console.log("cancle");
  });
});
