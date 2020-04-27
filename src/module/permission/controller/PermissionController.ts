import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
    HttpCode,
    UseInterceptors,
    CacheInterceptor, CacheTTL
} from "@nestjs/common";
import {PermissionService} from "../service/PermissionService";
import {JsonResponse} from "../../../common/JsonResponse";
import { Permission } from "../entity/Permission";
import {CreatePermissionData} from "../dto/CreatePermissionData";
import {EditPermissionData} from "../dto/EditPermissionData";
import { ApiTags } from "@nestjs/swagger";
import { Permissions } from "../decorator/Permissions";

/**
 * @package module.permission.controller
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionController
 */
@ApiTags('Permissions')
@Controller('api/v3')
export class PermissionController {

    constructor(
        private readonly permissionService: PermissionService
    ) {}

    @Get('permissions')
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(60)
    public async fetch(): Promise<JsonResponse<Permission[]>> {
        return new JsonResponse(
            await this.permissionService.fetch()
        )
    }

    @Post('permission')
    @HttpCode(200)
    @Permissions({
        name: "Permission create",
        permission: 'permission.create'
    })
    public async create(@Body() data: CreatePermissionData): Promise<JsonResponse<Permission>> {
        return new JsonResponse<Permission>(
            await this.permissionService.create(data)
        )
    }

    @Put('permission')
    @Permissions({
        name: "Permission edit",
        permission: 'permission.edit'
    })
    public async edit(@Body() data: EditPermissionData): Promise<JsonResponse<Permission>> {
        return new JsonResponse<Permission>(
            await this.permissionService.edit(data)
        )
    }


    @Delete("permission/:id")
    @Permissions({
        name: "Permission delete",
        permission: 'permission.delete'
    })
    public async remove(@Param("id") id: number) {

        await this.permissionService.remove(id);

        return new JsonResponse({});
    }

}
