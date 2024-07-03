import { ConflictException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto, FilterUserDto, FindUserDto } from './dto/user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  
  async getMe(jwt: string) {
    const decoded = this.jwtService.decode(jwt) as any;

    const user = await this.prisma.user.findFirst({
      where: {
        id: decoded.sub,
      },
    })

    return user;
  }
  
  async findOne(params: FindUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: params.email,
        id: params.id,
      },
    })

    return user;
  }

  async getUsers(filter: FilterUserDto) {
    const users = await this.prisma.user.findMany({
      where: {
        email: filter.email,
      },
    })

    return users
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists.');
        }
      }
      throw error;
    }
  }
}
