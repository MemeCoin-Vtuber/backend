import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@privy-io/server-auth';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
)();