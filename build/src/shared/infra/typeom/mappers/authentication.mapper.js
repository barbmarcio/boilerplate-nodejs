"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationMapper {
    toEntity(dto) {
        return {
            email: dto.email,
            first_name: dto.firstName,
            last_name: dto.lastName,
            password: dto.password,
            token: dto.token,
            created_at: dto.createdAt,
            updated_at: dto.updatedAt,
        };
    }
}
exports.default = new AuthenticationMapper();
//# sourceMappingURL=authentication.mapper.js.map