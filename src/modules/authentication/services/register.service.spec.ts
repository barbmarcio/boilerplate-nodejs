import FakeAuthenticationRepository from '../repositories/fakes/authentication.fake.repository';
import RegisterService from './register.service';
import AuthenticationDTO from '../dtos/authentication.dto';
import AppError from '../../../shared/errors/app-error';

let registerService: RegisterService;
let fakeAuthenticationRepository: FakeAuthenticationRepository;

describe('Register Service tests', () => {
  beforeEach(() => {
    fakeAuthenticationRepository = new FakeAuthenticationRepository();
    registerService = new RegisterService(fakeAuthenticationRepository);
    process.env.JWT_TOKEN_KEY = 'pineapple';
  });

  it('should register a new user', async () => {
    const plusOneUser: AuthenticationDTO = {
      email: 'plusone@ff.com',
      firstName: 'Plus',
      lastName: 'Person',
      password: '$2b$10$YvdSYzfan5f/UZEnkCUwHepGZTAFoHNkw.hK8KEGuXefOHtNSB2Hu',
      token: '',
      resetToken: '',
    };

    jest.spyOn(registerService, 'execute');

    const expectedMessage = `User ${plusOneUser.email} created successfully.`;
    expect(await registerService.execute(plusOneUser)).toEqual(expectedMessage);
    expect(registerService.execute).toHaveBeenCalled();
  });

  it('should not register a new user if already exists', async () => {
    const alreadyExistingUser: AuthenticationDTO = {
      email: 'testing@ff.com',
      firstName: 'Test',
      lastName: 'Person',
      password: '$2b$10$YvdSYzfan5f/UZEnkCUwHepGZTAFoHNkw.hK8KEGuXefOHtNSB2Hu',
    };
    await expect(registerService.execute(alreadyExistingUser)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
