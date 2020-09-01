/**
 * @package module.permission.decorator
 * @author Artem Ilinykh devsinglesly@gmail.com
 */
import { SetMetadata } from "@nestjs/common";
import { LogicalException } from "node-exceptions/build/src";
import { PermissionDefinitionInterface } from "./PermissionDefinitionInterface";

export const Permissions = (...permissions: (PermissionDefinitionInterface | string)[]) => {

    if(permissions.length <= 0) {
        throw new LogicalException("Permission decorator should be have 1 or greater rule");
    }

    permissions = permissions.map(permission => {
        if(typeof permission === "string") {
            return {
                permission: permission,
                name: permission
            } as PermissionDefinitionInterface;
        }

        if(typeof permission === "object") {
            if(!permission.hasOwnProperty('permission')) {
                throw new LogicalException("Permission object should be have a `permission` key");
            }

            return {
                permission: permission.permission,
                name: permission.hasOwnProperty('name') ? permission.name : permission.permission
            } as PermissionDefinitionInterface;
        }

        throw new TypeError(`Incorrect permission rule in decorator ${JSON.stringify(permission)}`);
    });

    return SetMetadata('permissions', permissions);
};
