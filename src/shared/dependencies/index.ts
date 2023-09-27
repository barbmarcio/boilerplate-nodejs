import { container } from 'tsyringe';
import AuthenticationRepository from '../infra/typeom/repositories/authentication.repository';
import AuthenticationRepositoryInterface from '../../modules/authentication/repositories/authentication.repository.interface';

container.registerSingleton<AuthenticationRepositoryInterface>(
  'AuthenticationRepository',
  AuthenticationRepository,
);
