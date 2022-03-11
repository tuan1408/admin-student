function Validator(formSelector) {
  var _this = this;

  var formRules = {};

  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var validatorRules = {
    required: function (value) {
      return value ? undefined : "vui lòng nhập trường này";
    },
    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "vui lòng nhập email";
    },
    min: function (min) {
      return function (value) {
        return value.length >= 6
          ? undefined
          : `vui lòng nhập ít nhất ${min} ký tự`;
      };
    },
  };

  //lấy ra form element trong Dom theo 'form Selector
  var formElement = document.querySelector(formSelector);

  //chỉ xử lí khi có element
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var isRuleHasValue = rule.includes(":");
        var ruleInfor;

        if (isRuleHasValue) {
          ruleInfor = rule.split(":");
          rule = ruleInfor[0];
        }

        var ruleFunc = validatorRules[rule];

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfor[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      // lắng nghe sự kiện validate

      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }
    //hàm thực hiện validate
    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;

      for (var rule of rules) {
        errorMessage = rule(event.target.value);
        if (errorMessage) break;
      }

      //nếu có lỗi thì hiển thị ra UI
      if (errorMessage) {
        var formGroup = getParent(event.target, ".form-group-cls");

        if (formGroup) {
          var formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formGroup.classList.add("invalid");
            formMessage.innerHTML = errorMessage;
          }
        }
      }

      return errorMessage;
    }
    function handleClearError(event) {
      var formGroup = getParent(event.target, ".form-group-cls");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        var formMessage = formGroup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerHTML = "";
        }
      }
    }
  }

  //xử lý hành vi submit form
  formElement.onsubmit = function (event) {
    event.preventDefault();

    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;

    for (var input of inputs) {
      if (handleValidate({ target: input })) {
        isValid = false;
      }
    }

    //khi không có lỗi thì submit form
    if (isValid) {
      if (typeof _this.onSubmit === "function") {
        var enableInput = formElement.querySelectorAll("[name]");
        var formValues = Array.from(enableInput).reduce(function (
          values,
          input
        ) {
          switch (input.type) {
            case "checkbox":
              if (!input.matches(":checked")) {
                values[input.name] = "";
                return values;
              }

              if (!Array.isArray(values[input.name])) {
                values[input.name] = [];
              }
              values[input.name].push(input.value);
              break;
            case "radio":
              if (input.matches(":checked")) {
                values[input.name] = input.value;
              }
              break;
            case "file":
              values[input.name] = input.files;
              break;
            default:
              values[input.name] = input.value;
          }
          return values;
        },
        {});

        _this.onSubmit(formValues);
      } else {
        formElement.submit();
      }
    }
  };
}
