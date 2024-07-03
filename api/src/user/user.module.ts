import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'
import { JwtModule } from 'src/modules/jwt.module'

import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
