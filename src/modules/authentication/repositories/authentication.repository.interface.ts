import User from '../../../shared/infra/typeom/entities/user.entity';

export default interface AuthenticationRepositoryInterface {
  getUserByEmail(email: string): Promise<User | null>;
  getUserByResetToken(resetToken: string): Promise<User | null>;
  register(data: User): Promise<User>;
  authenticate(email: string, token: string): Promise<User>;
  forgotPassword(email: string, resetToken: string): Promise<User>;
  resetPassword(data: User): Promise<User>;
}
