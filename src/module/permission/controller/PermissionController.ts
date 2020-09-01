import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
    HttpCode
} from "@nestjs/common";
import {PermissionService} from "../service/PermissionService";
import { Permission } from "../entity/Permission";
import {CreatePermissionData} from "../dto/CreatePermissionData";
import {EditPermissionData} from "../dto/EditPermissionData";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Permissions } from "../decorator/Permissions";

/**
 * @package module.permission.controller
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionController
 */
@ApiTags('Permissions')
export class PermissionController {

    constructor(
        private readonly permissionService: PermissionService
    ) {}

    @Get('permissions')
    @ApiOkResponse({
        type: Permission,
        isArray: true
    })
    public async fetch(): Promise<Permission[]> {
        return await this.permissionService.fetch()
    }

    @Post('permission')
    @HttpCode(200)
    @Permissions({
        name: "Permission create",
        permission: 'permission.create'
    })
    @ApiOkResponse({
        type: Permission
    })
    public async create(@Body() data: CreatePermissionData): Promise<Permission> {
        return await this.permissionService.create(data)
    }

    @Put('permission')
    @Permissions({
        name: "Permission edit",
        permission: 'permission.edit'
    })
    @ApiOkResponse({
        type: Permission
    })
    public async edit(@Body() data: EditPermissionData): Promise<Permission> {
        return await this.permissionService.edit(data)
    }


    @Delete("permission/:id")
    @Permissions({
        name: "Permission delete",
        permission: 'permission.delete'
    })
    @ApiOkResponse()
    public async remove(@Param("id") id: number) {
        await this.permissionService.remove(id);
    }

}
