/**
 * @package module.permission.dto
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class EditRoleData
 */
import { ApiProperty } from "@nestjs/swagger";

export class EditRoleData {
    @ApiProperty()
    id!: number;

    @ApiProperty({
        required: false
    })
    title?: string;

    @ApiProperty({
        required: false
    })
    name?: string;
}
