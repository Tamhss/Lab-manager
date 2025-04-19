import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Logger,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
    export class RolesGuard implements CanActivate {
    private readonly logger = new Logger(RolesGuard.name);

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) {
        this.logger.debug('No roles required, access granted');
        return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.role) {
        this.logger.warn('No user or role found in request');
        throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      this.logger.warn(
        `User role ${user.role} does not match required roles: ${requiredRoles}`,
      );
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    this.logger.debug(`User role ${user.role} granted access`);
    return true;
  }
}
  