import 'reflect-metadata';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AuthenticationRepositoryInterface from '../repositories/authentication.repository.interface';
import AppError, { AlertMessage } from '../../../shared/errors/app-error';
import { CommonMessages } from '../../../shared/errors/common-messages';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authRepository: AuthenticationRepositoryInterface,
  ) {}

  public async execute(resetToken: string, password: string): Promise<string> {
    const foundUser = await this.authRepository.getUserByResetToken(resetToken);

    if (!foundUser) {
      throw new AppError(
        AlertMessage.error,
        'Invalid or expired token',
        CommonMessages.INVALID_TOKEN,
      );
    }

    foundUser.reset_token = '';
    foundUser.password = await bcrypt.hash(password, 10);
    foundUser.token = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.JWT_TOKEN_KEY as jwt.Secret,
      {
        expiresIn: '2h',
      },
    );

    await this.authRepository.resetPassword(foundUser);

    return 'Password successfully redefined';
  }
}

export default ResetPasswordService;
