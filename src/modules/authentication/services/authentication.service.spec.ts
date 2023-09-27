import FakeAuthenticationRepository from '../repositories/fakes/authentication.fake.repository';
import AuthenticationDTO from '../dtos/authentication.dto';
import AppError from '../../../shared/errors/app-error';
import AuthenticationService from './authentication.service';
import { ActionType } from '../../../shared/constants/actions';

let authService: AuthenticationService;
let fakeAuthenticationRepository: FakeAuthenticationRepository;

describe('Authentication Service tests', () => {
  beforeEach(() => {
    fakeAuthenticationRepository = new FakeAuthenticationRepository();
    authService = new AuthenticationService(fakeAuthenticationRepository);
    process.env.JWT_TOKEN_KEY = 'pineapple';
  });

  it('should successfully login', async () => {
    const action = ActionType.LOG_IN;
    const expectedMessage = `Successfully ${action}`;
    const alreadyExistingUser: AuthenticationDTO = {
      email: 'testing@ff.com',
      firstName: 'Test',
      lastName: 'Person',
      password: 'pass',
    };

    jest.spyOn(authService, 'execute');

    expect(await authService.execute(alreadyExistingUser, action)).toEqual(
      expectedMessage,
    );
    const foundIndex = fakeAuthenticationRepository.users.findIndex(
      (user) => user.email === alreadyExistingUser.email,
    );
    expect(
      fakeAuthenticationRepository.users[foundIndex].token,
    ).not.toHaveLength(0);
    expect(authService.execute).toHaveBeenCalled();
  });

  it('should successfully logout', async () => {
    const action = ActionType.LOG_OUT;
    const expectedMessage = `Successfully ${action}`;
    const alreadyExistingUser: AuthenticationDTO = {
      email: 'testing@ff.com',
      firstName: 'Test',
      lastName: 'Person',
      password: 'pass',
    };
    const foundIndex = fakeAuthenticationRepository.users.findIndex(
      (user) => user.email === alreadyExistingUser.email,
    );
    fakeAuthenticationRepository.users[foundIndex].token =
      'token-to-be-blanked-out';

    jest.spyOn(authService, 'execute');

    expect(await authService.execute(alreadyExistingUser, action)).toEqual(
      expectedMessage,
    );
    expect(fakeAuthenticationRepository.users[foundIndex].token).not.toEqual(
      'token-to-be-blanked-out',
    );
    expect(authService.execute).toHaveBeenCalled();
  });

  it('should not be able to authenticate a non existing user', async () => {
    const action = ActionType.LOG_IN || ActionType.LOG_OUT;
    const nonExistingUser: AuthenticationDTO = {
      email: 'nonExisting@ff.com',
      firstName: 'Test',
      lastName: 'Person',
      password: 'pass',
    };
    await expect(
      authService.execute(nonExistingUser, action),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with a non-matching password', async () => {
    const action = ActionType.LOG_IN || ActionType.LOG_OUT;
    const nonExistingUser: AuthenticationDTO = {
      email: 'testing@ff.com',
      firstName: 'Test',
      lastName: 'Person',
      password: 'anotherPass',
    };
    await expect(
      authService.execute(nonExistingUser, action),
    ).rejects.toBeInstanceOf(AppError);
  });
});
