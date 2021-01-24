import { EMAIL, PASSWORD } from "../../components/pages/Login/consts";
import { LoginInfo } from "../../components/pages/Login/Login.model";

type Rule = {
  inputName: string;
  required: boolean;
  check?: RegExp;
  message: string;
};

export type ValidationError = {
  inputName: string;
  message: string;
};

const errorMessages = {
  required: 'Required field',
  invalidEmail: 'Email format is wrong',
  invalidPassword: 'Password format is wrong',
};

const patterns = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
};

export class ValidationService {
  public static checkLogin(inputData: LoginInfo) {
    const rules: Rule[] = [
      {
        inputName: EMAIL,
        required: true,
        check: patterns.email,
        message: errorMessages.invalidEmail,
      },
      {
        inputName: PASSWORD,
        required: true,
        check: patterns.password,
        message: errorMessages.invalidPassword,
      },
    ];
    const errors: ValidationError[] = [];

    for (const key in inputData) {
      rules.forEach((rule: Rule) => {
        if (rule.inputName === key) {
          if (rule.required && inputData[key] === '') {
            errors.push({ inputName: key, message: errorMessages.required });
          } else if (
            rule.check &&
            !rule.check.test((inputData[key] as string))
          ) {
            errors.push({ inputName: key, message: rule.message });
          }
        }
      });
    }

    return errors.length > 0 ? errors : [];
  }
}
