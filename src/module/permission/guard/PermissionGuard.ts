import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionService } from "~/module/permission/service/PermissionService";
import { PermissionInterface } from "~/module/permission/interface/PermissionInterface";
import { PermissionDeniedException } from "~/module/permission/exception/PermissionDeniedException";
import { PermissionSubjectInterface } from "~/module/permission/interface/PermissionSubjectInterface";

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
        const permissions: PermissionInterface[] = this.reflector
            .get<(PermissionInterface)[]>('permissions', context.getHandler())

        if(!permissions || !permissions.length) {
            return true;
        }

        const request = context.switchToHttp().getRequest();


        const user: PermissionSubjectInterface = request.user;

        if(!user) {
            throw new PermissionDeniedException();
        }

        if(user.isRoot()) {
            return true;
        }

        const validatedPermissions = await Promise.all(permissions.map(async (permission) => {
            return await this.permissionService.hasAccess(user.getRoles().map(role => role.getId()), permission.permission);
        }));

        const hasAccess = validatedPermissions.some(value => value);

        if(!hasAccess) {
            throw new PermissionDeniedException();
        }

        return true;
    }
}
