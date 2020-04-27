import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionService } from "~/module/permission/service/PermissionService";
import User from "~/entity/User";
import { TranslatableException } from "~/common/exception/TranslatableException";
import { PermissionInterface } from "~/module/permission/interface/PermissionInterface";

/**
 * @package module.permission.guard
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionGuard
 */
@Injectable()
export class PermissionGuard implements CanActivate{

    constructor(
        private readonly reflector: Reflector,
        private readonly permissionService: PermissionService
    ) {}

    public async canActivate(context: ExecutionContext) {
        const permissions: PermissionInterface[] = this.reflector.get('permissions', context.getHandler());

        if(!permissions || !permissions.length) {
            return true;
        }

        const request = context.switchToHttp().getRequest();


        const user: User = request.user;

        if(!user) {
            throw new UnauthorizedException();
        }

        if(user.isAdmin()) {
            return true;
        }

        const validatedPermissions = await Promise.all(permissions.map(async (permission) => {
            return await this.permissionService.hasAccess(user.getRoles().map(role => role.getId()), permission.permission);
        }));

        const hasAccess = validatedPermissions.some(value => value);

        if(!hasAccess) {
            throw new TranslatableException("Permission denied.", "PERMISSIONS.DENIED");
        }

        return true;
    }
}
