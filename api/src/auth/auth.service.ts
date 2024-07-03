import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { UserDto } from 'src/user/dto/user.dto'
import { LoginDto, RegisterDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10)
    const user = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    })
    const accessToken = await this.grantAccessToken(user)

    return {
      accessToken,
      user,
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOne({ email: loginDto.email })
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Incorrect email or password.')
    }
    const accessToken = await this.grantAccessToken(user)

    return {
      accessToken,
      user,
    }
  }

  private grantAccessToken(userDto: UserDto) {
    return this.jwtService.sign({ sub: userDto.id, email: userDto.email })
  }
}
