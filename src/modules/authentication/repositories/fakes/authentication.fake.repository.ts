import bcrypt from 'bcrypt';
import User from '../../../../shared/infra/typeom/entities/user.entity';
import AuthenticationRepositoryInterface from '../authentication.repository.interface';

class FakeAuthenticationRepository
  implements AuthenticationRepositoryInterface
{
  public users: User[] = [];

  constructor() {
    const mockedDate = new Date();
    const user1: User = {
      email: 'testing@ff.com',
      first_name: 'Test',
      last_name: 'Person',
      password: '$2b$10$YvdSYzfan5f/UZEnkCUwHepGZTAFoHNkw.hK8KEGuXefOHtNSB2Hu',
      token: '',
      reset_token: '',
      created_at: mockedDate,
      updated_at: mockedDate,
    };

    const user2: User = {
      email: 'another@ff.com',
      first_name: 'Another',
      last_name: 'Person',
      password: '$2b$10$YvdSYzfan5f/UZEnkCUwHepGZTAFoHNkw.hK8KEGuXefOHtNSB2Hu',
      token: '',
      reset_token: 'token',
      created_at: mockedDate,
      updated_at: mockedDate,
    };

    this.users.push(user1);
    this.users.push(user2);
  }

  register(data: User): Promise<User> {
    this.users.push(data);
    const foundIndex = this.users.findIndex((user) => user === data);
    return Promise.resolve(this.users[foundIndex]);
  }

  logInAndLogOut(email: string, token: string): Promise<User> {
    const foundIndex = this.users.findIndex(
      (user) => user.email === email && user.token === token,
    );
    this.users[foundIndex].token = token;
    return Promise.resolve(this.users[foundIndex]);
  }

  getUserByEmail(email: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.email === email);

    if (!foundUser) {
      return Promise.resolve(null);
    }
    return Promise.resolve(foundUser);
  }

  getUserByResetToken(resetToken: string): Promise<User | null> {
    const foundUser = this.users.find(
      (user) => user.reset_token === resetToken,
    );

    if (!foundUser) {
      return Promise.resolve(null);
    }
    return Promise.resolve(foundUser);
  }

  forgotPassword(email: string, resetToken: string): Promise<User> {
    const foundIndex = this.users.findIndex((user) => user.email === email);
    this.users[foundIndex].reset_token = resetToken;
    return Promise.resolve(this.users[foundIndex]);
  }

  resetPassword(data: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      (user) => user.reset_token === data.reset_token,
    );
    this.users[foundIndex] = data;
    return Promise.resolve(this.users[foundIndex]);
  }
}

export default FakeAuthenticationRepository;
