/**
 * @package module.permission.dto
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class CreateRoleData
 */
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleData {
    @ApiProperty()
    title!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    persistence?: boolean;
}
