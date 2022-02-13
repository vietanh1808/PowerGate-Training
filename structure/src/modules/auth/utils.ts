import { ILoginParams, ILoginValidation, IRegisterValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};


export const validateRePassword = (rePassword: string, password: string) => {
  if (rePassword !== password) {
    return 'conflictPassword'
  } 
  return ''
}

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};

export const validateSignUp = (element: string, values: string): string => {
  if (values) return ''
  switch (element) {
    case 'gender':
      return 'genderRiquire'
    case 'name':
      return 'nameRequire'    
    case 'state':
      return 'stateRequire'
    case 'region':
      return 'regionRequire'
    default:
      return ''
  }
}

export const validateRegister = (values: IRegisterValidation): IRegisterValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    rePassword: validateRePassword(values.rePassword, values.password),
    gender: validateSignUp('gender', values.gender),
    region: validateSignUp('region', values.region),
    state: validateSignUp('state', values.state),
    name: validateSignUp('name', values.name)
  };
}

export const validRegister = (values: IRegisterValidation) => {
  
  return !values.email 
          && !values.gender 
          && !values.name 
          && !values.password 
          && !values.region 
          && !values.rePassword 
          && !values.state
}