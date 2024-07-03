import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

describe('AuthService', () => {
  let service: AuthService

  const mockUserService = {
    createUser: jest.fn(),
    findOne: jest.fn(),
  }

  const mockJwtService = {
    sign: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('register', () => {
    it('should create a new user and return access token', async () => {
      const registerDto = { email: 'test@example.com', password: 'password123' }
      const user = { id: '1', ...registerDto }
      const accessToken = 'access_token'

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword')
      mockUserService.createUser.mockResolvedValue(user)
      mockJwtService.sign.mockReturnValue(accessToken)

      const result = await service.register(registerDto)

      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10)
      expect(mockUserService.createUser).toHaveBeenCalledWith({
        ...registerDto,
        password: 'hashedPassword',
      })
      expect(mockJwtService.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email })
      expect(result).toEqual({ accessToken, user })
    })
  })

  describe('login', () => {
    it('should validate user credentials and return access token', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' }
      const user = { id: '1', email: loginDto.email, password: 'hashedPassword' }
      const accessToken = 'access_token'

      mockUserService.findOne.mockResolvedValue(user)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
      mockJwtService.sign.mockReturnValue(accessToken)

      const result = await service.login(loginDto)

      expect(mockUserService.findOne).toHaveBeenCalledWith({ email: loginDto.email })
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.password)
      expect(mockJwtService.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email })
      expect(result).toEqual({ accessToken, user })
    })

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDto = { email: 'wrong@example.com', password: 'password123' }

      mockUserService.findOne.mockResolvedValue(null)

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException)
    })
  })
})
