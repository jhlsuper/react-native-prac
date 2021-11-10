const validation = (value, rules, form) => {
  let valid = true;

  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired(value);
        console.log(valid);
        break;
      case 'isEmail':
        valid = valid && validateEmail(value);
        console.log(valid);
        break;
      case 'minLength':
        break;
      case 'confirmPassword':
        break;
      default:
        valid = true;
    }
  }

  return valid;
};

const validateRequired = value => {
  if (value != '') {
    return true;
  }
  return false;
};
const validateEmail = value => {
  const expression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //정규 표현식
  return expression.test(String(value).toLocaleLowerCase());
};

export default validation;
