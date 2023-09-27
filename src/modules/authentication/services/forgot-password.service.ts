import 'reflect-metadata';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { CommonMessages } from '../../../shared/errors/common-messages';
import AppError, { AlertMessage } from '../../../shared/errors/app-error';
import AuthenticationRepositoryInterface from '../repositories/authentication.repository.interface';

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authRepository: AuthenticationRepositoryInterface,
  ) {}

  public async execute(email: string): Promise<string> {
    const foundUser = await this.authRepository.getUserByEmail(email);

    if (!foundUser) {
      throw new AppError(
        AlertMessage.error,
        'No user found with provided email',
        CommonMessages.NOT_FOUND_ERROR,
      );
    }

    const resetToken = jwt.sign(
      {
        type: 'reset',
        email,
      },
      process.env.JWT_TOKEN_KEY as jwt.Secret,
      {
        expiresIn: '2h',
      },
    );

    await this.authRepository.forgotPassword(email, resetToken);

    return 'Reset link sent by email (WIP)';
  }
}

export default ForgotPasswordService;
