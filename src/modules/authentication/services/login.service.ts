import 'reflect-metadata';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AuthenticationRepositoryInterface from '../repositories/authentication.repository.interface';
import AuthenticationMapper from '../../../shared/infra/typeom/mappers/authentication.mapper';
import AuthenticationDTO from '../dtos/authentication.dto';
import AppError, { AlertMessage } from '../../../shared/errors/app-error';
import { CommonMessages } from '../../../shared/errors/common-messages';

@injectable()
class LogInService {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authRepository: AuthenticationRepositoryInterface,
  ) {}

  public async execute(data: AuthenticationDTO): Promise<string> {
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

    data.token = jwt.sign(
      {
        email: data.email,
      },
      process.env.JWT_TOKEN_KEY as jwt.Secret,
      {
        expiresIn: '2h',
      },
    );

    const mappedUser = AuthenticationMapper.toEntity(data);
    await this.authRepository.logInAndLogOut(
      mappedUser.email,
      mappedUser.token as string,
    );

    return 'Successfully logged in';
  }
}

export default LogInService;
