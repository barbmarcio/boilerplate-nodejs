import 'reflect-metadata';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AuthenticationRepositoryInterface from '../repositories/authentication.repository.interface';
import AuthenticationDTO from '../dtos/authentication.dto';
import AppError, { AlertMessage } from '../../../shared/errors/app-error';
import { CommonMessages } from '../../../shared/errors/common-messages';
import { ActionType } from '../../../shared/constants/actions';

@injectable()
class AuthenticationService {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authRepository: AuthenticationRepositoryInterface,
  ) {}

  public async execute(
    data: AuthenticationDTO,
    action: ActionType,
  ): Promise<string> {
    const foundUser = await this.authRepository.getUserByEmail(data.email);

    if (!foundUser) {
      throw new AppError(
        AlertMessage.error,
        'No user found with provided email',
        CommonMessages.NOT_FOUND_ERROR,
      );
    }

    if (!(await bcrypt.compare(data.password, foundUser.password))) {
      throw new AppError(
        AlertMessage.error,
        'Invalid credentials',
        CommonMessages.INVALID_CREDENTIALS,
      );
    }

    foundUser.token = '';
    if (action === ActionType.LOG_IN) {
      foundUser.token = jwt.sign(
        {
          email: foundUser.email,
        },
        process.env.JWT_TOKEN_KEY as jwt.Secret,
        {
          expiresIn: '2h',
        },
      );
    }

    await this.authRepository.authenticate(
      foundUser.email,
      foundUser.token as string,
    );

    return `Successfully ${action}`;
  }
}

export default AuthenticationService;
