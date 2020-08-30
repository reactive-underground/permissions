import { Module, OnModuleInit } from "@nestjs/common";
import { PermissionRepository } from "./repository/PermissionRepository";
import { RolesRepository } from "./repository/RolesRepository";
import {RoleController} from "./controller/RoleController";
import {PermissionController} from "./controller/PermissionController";
import {RoleService} from "./service/RoleService";
import {PermissionService} from "./service/PermissionService";
import { PermissionInterface } from "./interface/PermissionInterface";
import { DiscoveryModule, DiscoveryService } from "@nestjs-plus/discovery";

/**
 * @package module.permission
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionModule
 */
@Module({
    imports: [
        DiscoveryModule,
    ],
    controllers: [
        RoleController,
        PermissionController
    ],
    providers: [
        PermissionRepository,
        RolesRepository,
        RoleService,
        PermissionService
    ],
    exports: [
        PermissionRepository,
        RolesRepository,
        RoleService,
        PermissionService
    ]
})
export class PermissionModule implements OnModuleInit {

    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly permissionService: PermissionService,
    ) {}

    public async onModuleInit(): Promise<void> {
        const methodsWithPermissions = await this.discoveryService.controllerMethodsWithMetaAtKey('permissions');

        const permissions: PermissionInterface[] = methodsWithPermissions.map<PermissionInterface[]>(method => {
            return method.meta as PermissionInterface[];
        })
            .reduce((accum, item) => {
                accum.push(...item);

                return accum;
            }, [] as PermissionInterface[]);

        for(const permission of permissions) {
            await this.permissionService.define(permission.name, permission.permission);
        }
    }
}
