/**
 * @package module.permission.dto
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CreatePermissionData
 */
export class CreatePermissionData {
    name: string;
    permission: string;
    roleIds?: number[];
}
