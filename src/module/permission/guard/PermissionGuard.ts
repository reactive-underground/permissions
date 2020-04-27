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


        const subject: PermissionSubjectInterface = request.user;

        if(!subject) {
            throw new PermissionDeniedException();
        }

        if(subject.isRoot()) {
            return true;
        }

        const hasAccess = await this.permissionService.hasAccess(subject, permissions);

        if(!hasAccess) {
            throw new PermissionDeniedException();
        }

        return true;
    }
}
