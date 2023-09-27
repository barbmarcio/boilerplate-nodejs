export default class AuthenticationDTO {
  firstName: string;

  lastName: string;

  password: string;

  email: string;

  token?: string;

  resetToken?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
