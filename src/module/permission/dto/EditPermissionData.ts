import { ApiProperty } from "@nestjs/swagger";

/**
 * @package module.permission.dto
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class EditPermissionData
 */
export class EditPermissionData {
    @ApiProperty()
    id!: number;

    @ApiProperty({
        required: false
    })
    name?: string;

    @ApiProperty({
        required: false
    })
    permission?: string;

    @ApiProperty({
        required: false,
        type: 'number',
        isArray: true
    })
    roleIds?: number[]
}
