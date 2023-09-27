import 'reflect-metadata';
import FakeAuthenticationRepository from '../repositories/fakes/authentication.fake.repository';
import AuthenticationDTO from '../dtos/authentication.dto';
import AppError from '../../../shared/errors/app-error';
import ResetPasswordService from './reset-password.service';

let resetPasswordService: ResetPasswordService;
let fakeAuthenticationRepository: FakeAuthenticationRepository;

describe('Reset Password Service tests', () => {
  beforeEach(() => {
    fakeAuthenticationRepository = new FakeAuthenticationRepository();
    resetPasswordService = new ResetPasswordService(
      fakeAuthenticationRepository,
    );
    process.env.JWT_TOKEN_KEY = 'pineapple';
  });

  it('should successfully reset the user`s password', async () => {
    const userWithNewPassword: AuthenticationDTO = {
      email: 'another@ff.com',
      firstName: 'Test',
      lastName: 'Person',
      password: 'new-password',
      token: '',
      resetToken: 'token',
    };

    jest.spyOn(resetPasswordService, 'execute');

    const expectedMessage = `Password successfully redefined`;
    expect(
      await resetPasswordService.execute(
        userWithNewPassword.resetToken as string,
        userWithNewPassword.password,
      ),
    ).toEqual(expectedMessage);
    expect(resetPasswordService.execute).toHaveBeenCalled();
  });

  it('should not be able to reset a password with a non existing reset token', async () => {
    const nonExistingToken: AuthenticationDTO = {
      email: 'testing@ff.com',
      firstName: 'Test',
      lastName: 'Person',
      password: '$2b$10$YvdSYzfan5f/UZEnkCUwHepGZTAFoHNkw.hK8KEGuXefOHtNSB2Hu',
      resetToken: 'none',
    };
    await expect(
      resetPasswordService.execute(
        nonExistingToken.resetToken as string,
        nonExistingToken.password,
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
