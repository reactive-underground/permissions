import {JsonResponse} from "~/common/JsonResponse";
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    UseInterceptors,
    CacheInterceptor, CacheTTL
} from "@nestjs/common";
import {RoleService} from "~/module/permission/service/RoleService";
import Role from "~/module/permission/entity/Role";
import {CreateRoleData} from "~/module/permission/dto/CreateRoleData";
import {EditRoleData} from "~/module/permission/dto/EditRoleData";
import { ApiTags } from "@nestjs/swagger";
import { Permissions } from "~/module/permission/decorator/Permissions";

/**
 * @package module.permission.controller
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class RoleController
 */
@ApiTags('Roles')
@Controller('api/v3')
export class RoleController {

    constructor(
        private readonly roleService: RoleService
    ) {
    }

    @Get('roles')
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(60)
    public async fetch(): Promise<JsonResponse<Role[]>> {
        return new JsonResponse(
            await this.roleService.fetch()
        )
    }

    @Post('role')
    @HttpCode(200)
    @Permissions({
        name: "Role create",
        permission: 'role.create'
    })
    public async create(@Body() data: CreateRoleData): Promise<JsonResponse<Role>> {
        return new JsonResponse<Role>(
            await this.roleService.create(data)
        )
    }

    @Put('role')
    @Permissions({
        name: "Role edit",
        permission: 'role.edit'
    })
    public async edit(@Body() data: EditRoleData): Promise<JsonResponse<Role>> {
        return new JsonResponse<Role>(
            await this.roleService.edit(data)
        )
    }

    @Delete("role/:id")
    @Permissions({
        name: "Role delete",
        permission: 'role.delete'
    })
    public async remove(@Param("id") id: number) {

        await this.roleService.remove(id);

        return new JsonResponse({});
    }
}
