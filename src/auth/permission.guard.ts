import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedUserType = this.reflector.get<string>(
      'allowedUserType',
      context.getHandler(),
    );

    if (!allowedUserType) {
      return true; // If no specific permissions are required, grant access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (allowedUserType === user.type) {
      return true;
    }

    return false;
  }
}
