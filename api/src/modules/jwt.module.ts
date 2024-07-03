import { JwtModule as Jwt } from '@nestjs/jwt'

export const JwtModule = Jwt.register({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY },
})
