import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionService } from "../service/PermissionService";
import { PermissionInterface } from "../interface/PermissionInterface";
import { PermissionDeniedException } from "../exception/PermissionDeniedException";
import { PermissionSubjectInterface } from "../interface/PermissionSubjectInterface";

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

        const request = context.switchToHttp().getRequest();


        const subject: PermissionSubjectInterface = request.user;

        if(!subject) {
            throw new PermissionDeniedException("Subject not recognized.");
        }

        const hasAccess = await this.permissionService.hasAccess(subject, permissions);

        if(!hasAccess) {
            throw new PermissionDeniedException("Access not granted");
        }

        return true;
    }
}
