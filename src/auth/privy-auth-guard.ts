import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrivyClient } from '@privy-io/server-auth';

@Injectable()
export class PrivyAuthGuard implements CanActivate {
  private readonly privyClient: PrivyClient;

  constructor(private reflector: Reflector) {
    this.privyClient = new PrivyClient(process.env.PRIVY_APP_ID || '', process.env.PRIVY_API_SECRET || '',);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Extract the bearer token from Authorization header
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid bearer token');
    }

    // Get the token value (remove "Bearer " prefix)
    const token = authHeader.substring(7);
    if (!token) {
      throw new UnauthorizedException('Empty bearer token');
    }

    try {
      // Verify the token and get the user
      const verificationResponse = await this.privyClient.verifyAuthToken(token);
      
      if (!verificationResponse) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      // Add the user to the request object for use in controllers
      const userId = verificationResponse.userId;

      request.user = await this.privyClient.getUserById(userId);
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}