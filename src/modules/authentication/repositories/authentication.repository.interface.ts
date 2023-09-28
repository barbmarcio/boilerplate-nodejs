import User from '../../../shared/infra/typeom/entities/user.entity';

export default interface AuthenticationRepositoryInterface {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByResetToken(resetToken: string): Promise<User | null>;
  register(data: User): Promise<User>;
  authenticate(email: string, token: string): Promise<void>;
  forgotPassword(email: string, resetToken: string): Promise<void>;
  resetPassword(data: User): Promise<void>;
}
