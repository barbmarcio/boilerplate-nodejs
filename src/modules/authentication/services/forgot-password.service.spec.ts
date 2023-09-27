import AppError from '../../../shared/errors/app-error';
import ForgotPasswordService from './forgot-password.service';
import FakeAuthenticationRepository from '../repositories/fakes/authentication.fake.repository';

let forgotPasswordService: ForgotPasswordService;
let fakeAuthenticationRepository: FakeAuthenticationRepository;

describe('Forgot Password Service tests', () => {
  beforeEach(() => {
    fakeAuthenticationRepository = new FakeAuthenticationRepository();
    forgotPasswordService = new ForgotPasswordService(
      fakeAuthenticationRepository,
    );
    process.env.JWT_TOKEN_KEY = 'pineapple';
  });

  it('should successfully request the password reset', async () => {
    const email: string = 'another@ff.com';
    const foundIndex = fakeAuthenticationRepository.users.findIndex(
      (user) => user.email === email,
    );
    fakeAuthenticationRepository.users[foundIndex].reset_token = '';
    fakeAuthenticationRepository.users[foundIndex].token = 'valid-token';

    jest.spyOn(forgotPasswordService, 'execute');

    const expectedMessage = `Reset link sent by email (WIP)`;
    expect(await forgotPasswordService.execute(email)).toEqual(expectedMessage);
    expect(
      fakeAuthenticationRepository.users[foundIndex].reset_token,
    ).not.toEqual('');
    expect(fakeAuthenticationRepository.users[foundIndex].token).not.toEqual(
      'valid-token',
    );
    expect(forgotPasswordService.execute).toHaveBeenCalled();
  });

  it('should not be able to request the reset a password reset for a non existing user', async () => {
    const nonExistingEmail: string = 'rando@ff.com';
    await expect(
      forgotPasswordService.execute(nonExistingEmail),
    ).rejects.toBeInstanceOf(AppError);
  });
});
