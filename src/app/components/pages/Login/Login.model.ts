import { ValidationError } from '../../../common/services/validationService';

export interface ILoginProps {
  userData: LoginInfo;
  message: string | null;
  onSubmit: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  loading: boolean;
  validationErrors: ValidationError[];
  displayError: (id: string) => boolean;
  emailErrorText: string;
  passwordErrorText: string;
}

export type LoginInfo = {
  email: string;
  password: string;
  [key: string]: unknown;
};

export type Fields = 'email' | 'password';
