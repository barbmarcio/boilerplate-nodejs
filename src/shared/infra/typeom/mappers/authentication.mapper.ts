import AuthenticationDTO from '../../../../modules/authentication/dtos/authentication.dto';
import User from '../entities/user.entity';

class AuthenticationMapper {
  toEntity(dto: AuthenticationDTO): User {
    return {
      email: dto.email,
      first_name: dto.firstName,
      last_name: dto.lastName,
      password: dto.password,
      token: dto.token,
      reset_token: dto.resetToken,
      created_at: dto.createdAt,
      updated_at: dto.updatedAt,
    };
  }
}

export default new AuthenticationMapper();
