import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import { Public } from 'src/decorators/public.decorator'
import { UserDto } from 'src/user/dto/user.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @Serialize(UserDto)
  async register(@Body() registerDto: RegisterDto) {
    const { user, accessToken } = await this.authService.register(registerDto)

    return {
      data: user,
      accessToken,
    }
  }

  @Post('login')
  @Public()
  @Serialize(UserDto)
  async login(@Body() loginDto: LoginDto) {
    const { user, accessToken } = await this.authService.login(loginDto)

    return {
      data: user,
      accessToken,
    }
  }
}
