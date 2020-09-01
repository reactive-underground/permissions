/**
 * @package module.permission.dto
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CreatePermissionData
 */
import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionData {
    @ApiProperty({
        required: true,
        type: 'string'
    })
    name!: string;

    @ApiProperty({
        required: true,
        type: 'string'
    })
    permission!: string;

    @ApiProperty({
        required: false,
        default: null,
        type: 'number',
        isArray: true
    })
    roleIds?: number[];
}
