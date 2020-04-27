/**
 * @package module.permission.decorator
 * @author Artem Ilinykh devsinglesly@gmail.com
 */
import { SetMetadata } from "@nestjs/common";
import { PermissionInterface } from "~/module/permission/interface/PermissionInterface";
import { LogicalException } from "node-exceptions/build/src";

export const Permissions = (...permissions: (PermissionInterface | string)[]) => {

    if(permissions.length <= 0) {
        throw new LogicalException("Permission decorator should be have 1 or greater rule");
    }

    permissions.forEach(permission => {
        if(typeof permission === "string") {
            return {
                permission: permission,
                name: permission
            } as PermissionInterface;
        }

        if(typeof permission === "object") {
            if(!permission.hasOwnProperty('permission')) {
                throw new LogicalException("Permission object should be have a `permission` key");
            }

            return {
                permission: permission.permission,
                name: permission.hasOwnProperty('name') ? permission.name : permission.permission
            } as PermissionInterface;
        }

        throw new TypeError(`Incorrect permission rule in decorator ${JSON.stringify(permission)}`);
    });

    return SetMetadata('permissions', permissions);
};
