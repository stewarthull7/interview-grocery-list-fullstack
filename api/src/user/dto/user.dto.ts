import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator'
import { Expose } from 'class-transformer'

export class FilterUserDto {
  @IsString()
  @IsOptional()
  email?: string
}

export class UserDto {
  @Expose()
  id: string

  @Expose()
  email: string

  @Expose()
  firstName: string

  @Expose()
  lastName: string
}

export class FindUserDto {
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  email?: string
}

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(254)
  email: string

  @IsString()
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  @MaxLength(50)
  firstName?: string

  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName?: string
}
