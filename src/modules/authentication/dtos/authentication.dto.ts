export default class AuthenticationDTO {
  uuid?: string;

  firstName: string;

  lastName: string;

  password: string;

  email: string;

  token?: string;

  resetToken?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
