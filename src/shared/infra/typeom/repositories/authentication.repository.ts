import { AppDataSource } from '../../../database/ormconfig';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import AuthenticationRepositoryInterface from '../../../../modules/authentication/repositories/authentication.repository.interface';

class AuthenticationRepository implements AuthenticationRepositoryInterface {
  private readonly authRepository: Repository<User>;

  constructor() {
    this.authRepository = AppDataSource.getRepository(User);
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

  public async authenticate(email: string, token: string): Promise<User> {
    return this.authRepository.save({
      email,
      token,
    });
  }

  public async logout(data: User): Promise<string> {
    return '';
  }

  forgotPassword(email: string, resetToken: string): Promise<User> {
    return this.authRepository.save({
      email,
      reset_token: resetToken,
    });
  }

  public async resetPassword(data: User): Promise<User> {
    return this.authRepository.save(data);
  }
}

export default AuthenticationRepository;
