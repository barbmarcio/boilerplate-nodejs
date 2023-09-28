import { Repository } from 'typeorm';
import { AppDataSource } from '../../../database/ormconfig';
import User from '../entities/user.entity';
import AuthenticationRepositoryInterface from '../../../../modules/authentication/repositories/authentication.repository.interface';

class AuthenticationRepository implements AuthenticationRepositoryInterface {
  private readonly authRepository: Repository<User>;

  constructor() {
    this.authRepository = AppDataSource.getRepository(User);
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.authRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.authRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async getUserByResetToken(resetToken: string): Promise<User | null> {
    return this.authRepository.findOne({
      where: {
        reset_token: resetToken,
      },
    });
  }

  public async register(data: User): Promise<User> {
    const newUser: User = this.authRepository.create(data);
    await this.authRepository.save(newUser);

    return newUser;
  }

  public async authenticate(email: string, token: string): Promise<void> {
    await this.authRepository.update(
      {
        email,
      },
      {
        token,
      },
    );
  }

  public async forgotPassword(
    email: string,
    resetToken: string,
  ): Promise<void> {
    await this.authRepository.update(
      {
        email,
      },
      {
        reset_token: resetToken,
        token: '',
      },
    );
  }

  public async resetPassword(data: User): Promise<void> {
    await this.authRepository.update(
      { email: data.email },
      {
        reset_token: '',
        token: data.token,
        password: data.password,
      },
    );
  }
}

export default AuthenticationRepository;
