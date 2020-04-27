/**
 * @package module.permission.dto
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class EditPermissionData
 */
export class EditPermissionData {
    id: number;
    name?: string;
    permission?: string;
    roleIds?: number[]
}
