const validator = {
  validateForm: (fieldName, formFields, formErrors) => {
    let fields = formFields;
    let errors = formErrors;
    errors['formIsValid'] = true;
    if (
      (fieldName == 'user_name' || fieldName == null) &&
      'user_name' in fields
    ) {
      if (!fields['user_name']) {
        errors['user_name'] = true;
        errors['formIsValid'] = false;
      } 
      else errors['user_name'] = '';
      // else {
      //   let pattern = new RegExp(
      //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      //   );
      //   if (!fields['user_name'].match(/[^A-Za-z0-9_@./#&+-*$]/) && !pattern.test(fields['user_name'])) 

      //   {
      //     errors['user_name'] = true;
      //     errors['formIsValid'] = false;
      //   } else errors['user_name'] = '';
      // }
    }
    if (
      (fieldName == 'first_name' || fieldName == null) &&
      'first_name' in fields
    ) {
      if (!fields['first_name']) {
        errors['first_name'] = true;
        errors['formIsValid'] = false;
      } else {
        if (!fields['first_name'].match(/^[0-9a-zA-Z]*$/)) {
          errors['first_name'] = true;
          errors['formIsValid'] = false;
        } else errors['first_name'] = '';
      }
    }
    if (
      (fieldName == 'last_name' || fieldName == null) &&
      'last_name' in fields
    ) {
      if (!fields['last_name']) {
        errors['last_name'] = true;
        errors['formIsValid'] = false;
      } else {
        if (!fields['last_name'].match(/^[0-9a-zA-Z]*$/)) {
          errors['last_name'] = true;
          errors['formIsValid'] = false;
        } else errors['last_name'] = '';
      }
    }

    if ((fieldName == 'name' || fieldName == null) && 'name' in fields) {
      if (!fields['name']) {
        errors['name'] = 'Please enter name.';
        errors['formIsValid'] = false;
      } else {
        if (!fields['name'].match(/^[a-zA-Z ]*$/)) {
          errors['name'] = 'Please enter alphabet characters only.';
          errors['formIsValid'] = false;
        } else errors['name'] = '';
      }
    }

    if ((fieldName == 'email' || fieldName == null) && 'email' in fields) {
      if (!fields['email']) {
        errors['email'] = true;
        errors['formIsValid'] = false;
      } else {
        let pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        );
        if (!pattern.test(fields['email'])) {
          errors['email'] = true;
          errors['formIsValid'] = false;
        } else errors['email'] = '';
      }
    }
    if ((fieldName == 'phone' || fieldName == null) && 'phone' in fields) {
      if (!fields['phone']) {
        errors['phone'] = true;
        errors['formIsValid'] = false;
      }else {
        if (fields['phone'].length < 10) {
          errors['phone'] = true;
          errors['formIsValid'] = false;
        } else {
          errors['phone'] = '';
        }
      } 
    }

    if (
      (fieldName == 'dateOfBirth' || fieldName == null) &&
      'dateOfBirth' in fields
    ) {
      if (!fields['dateOfBirth']) {
        errors['dateOfBirth'] = 'Please enter your date of birth';
        errors['formIsValid'] = false;
      } else {
        errors['dateOfBirth'] = '';
      }
    }
    if (
      (fieldName == 'password' || fieldName == null) &&
      'password' in fields
    ) {
      if (!fields['password']) {
        errors['password'] = 'blank';
        errors['formIsValid'] = false;
      } else {
        if (fields['password'].length < 8) {
          errors['password'] = "length";
          errors['formIsValid'] = false;
        }
        else if (fields['password'] === fields['current_password']) {
          errors['password'] = "oldnewshouldnotbesame";
          errors['formIsValid'] = false;
        }
        else {
          errors['password'] = '';
        }
      }
    }
if (
  (fieldName == 'current_password' || fieldName == null) &&
  'current_password' in fields
) {
  if (!fields['current_password']) {
    errors['current_password'] = 'blank';
    errors['formIsValid'] = false;
  } else {
    if (fields['current_password'].length < 8) {
      errors['current_password'] = "length";
      errors['formIsValid'] = false;
    } else {
      errors['current_password'] = '';
    }
  }
}

    if ((fieldName == 'address' || fieldName == null) && 'address' in fields) {
      if (!fields['address']) {
        errors['address'] = true;
        errors['formIsValid'] = false;
      } else {
        errors['address'] = '';
      }
    }

    if (
      (fieldName == 'sortCode' || fieldName == null) &&
      'sortCode' in fields
    ) {
      if (!fields['sortCode']) {
        errors['sortCode'] = 'Please enter sortCode!';
        errors['formIsValid'] = false;
      } else {
        errors['sortCode'] = '';
      }
    }

    if (
      (fieldName == 'postalCode' || fieldName == null) &&
      'postalCode' in fields
    ) {
      if (!fields['postalCode']) {
        errors['postalCode'] = 'Please enter postal code!';
        errors['formIsValid'] = false;
      } else {
        errors['postalCode'] = '';
      }
    }

    if (
      (fieldName == 'con_password' || fieldName == null) &&
      'con_password' in fields
    ) {
      if (!fields['con_password']) {
        errors['con_password'] = 'blank';
        errors['formIsValid'] = false;
      } else if (fields['con_password'] !== fields['password']) {
        errors['con_password'] = 'not matched';
        errors['formIsValid'] = false;
      }
      else if (fields['con_password'].length < 8) {
        errors['con_password'] = "length";
        errors['formIsValid'] = false;
      } else errors['con_password'] = '';
    }
    if (
      (fieldName == 'verifyOTP' || fieldName == null) &&
      'verifyOTP' in fields
    ) {
      if (!fields['verifyOTP']) {
        errors['verifyOTP'] = 'Please enter OTP.';
        errors['formIsValid'] = false;
      } else {
        if (fields['verifyOTP'].length < 4) {
          errors['verifyOTP'] = "Please enter OTP!'";
          errors['formIsValid'] = false;
        } else {
          errors['verifyOTP'] = '';
        }
      }
    }
    return errors;
  },
};
module.exports = validator;
