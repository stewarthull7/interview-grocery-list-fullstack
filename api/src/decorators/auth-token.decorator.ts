import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const AuthToken = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest()
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return null
  }
  return authHeader.split(' ')[1]
})
