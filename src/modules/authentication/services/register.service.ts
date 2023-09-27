import 'reflect-metadata';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AuthenticationRepositoryInterface from '../repositories/authentication.repository.interface';
import AuthenticationMapper from '../../../shared/infra/typeom/mappers/authentication.mapper';
import AuthenticationDTO from '../dtos/authentication.dto';
import AppError, { AlertMessage } from '../../../shared/errors/app-error';
import { CommonMessages } from '../../../shared/errors/common-messages';

import { config } from 'dotenv';
config();

@injectable()
class RegisterService {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authRepository: AuthenticationRepositoryInterface,
  ) {}

  public async execute(data: AuthenticationDTO): Promise<string> {
    const foundUser = await this.authRepository.getUserByEmail(data.email);

    if (foundUser) {
      throw new AppError(
        AlertMessage.error,
        `The email ${data.email} is already being used`,
        CommonMessages.ALREADY_EXISTS,
      );
    }

    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.password = await bcrypt.hash(data.password, 10);
    data.email = data.email.toLowerCase();
    data.resetToken = '';
    data.token = jwt.sign(
      {
        email: data.email,
      },
      process.env.JWT_TOKEN_KEY as jwt.Secret,
      {
        expiresIn: '2h',
      },
    );

    const userCreated = await this.authRepository.register(
      AuthenticationMapper.toEntity(data),
    );

    return `User ${userCreated.email} created successfully.`;
  }
}

export default RegisterService;
