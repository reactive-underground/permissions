/**
 * @package module.permission.decorator
 * @author Artem Ilinykh devsinglesly@gmail.com
 */
import { SetMetadata } from "@nestjs/common";
import { PermissionInterface } from "~/module/permission/interface/PermissionInterface";

export const Permissions = (...permission: (PermissionInterface | string)[]) => SetMetadata('permissions', permission);
