import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
} from "@nestjs/common";
import {RoleService} from "../service/RoleService";
import { Role } from "../entity/Role";
import {CreateRoleData} from "../dto/CreateRoleData";
import {EditRoleData} from "../dto/EditRoleData";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Permissions } from "../decorator/Permissions";

/**
 * @package module.permission.controller
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class RoleController
 */
@ApiTags('Roles')
export class RoleController {

    constructor(
        private readonly roleService: RoleService
    ) {}

    @Get('roles')
    @ApiOkResponse({
        type: Role,
        isArray: true
    })
    public async fetch(): Promise<Role[]> {
        return await this.roleService.fetch()
    }

    @Post('role')
    @HttpCode(200)
    @Permissions({
        name: "Role create",
        permission: 'role.create'
    })
    @ApiOkResponse({
        type: Role
    })
    public async create(@Body() data: CreateRoleData): Promise<Role> {
        return  await this.roleService.create(data)
    }

    @Put('role')
    @Permissions({
        name: "Role edit",
        permission: 'role.edit'
    })
    @ApiOkResponse({
        type: Role
    })
    public async edit(@Body() data: EditRoleData): Promise<Role> {
        return await this.roleService.edit(data)
    }

    @Delete("role/:id")
    @Permissions({
        name: "Role delete",
        permission: 'role.delete'
    })
    @ApiOkResponse()
    public async remove(@Param("id") id: number) {
        await this.roleService.remove(id);
    }
}
