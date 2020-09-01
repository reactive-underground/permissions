import { Controller, DynamicModule, Module, OnModuleInit, Provider } from "@nestjs/common";
import {RoleService} from "./service/RoleService";
import {PermissionService} from "./service/PermissionService";
import { DiscoveryModule, DiscoveryService } from "@nestjs-plus/discovery";
import { Interface } from "./decorator/Interface";
import { PERMISSION_REPOSITORY_INTERFACE, ROLE_REPOSITORY_INTERFACE, ROOT_OPTIONS } from "./constants/constants";
import { PermissionModuleInitInterface } from "./PermissionModuleInitInterface";
import { PermissionController } from "./controller/PermissionController";
import { RoleController } from "./controller/RoleController";
import { RootOptions } from "./options/RootOptions";
import { PermissionDefinitionInterface } from "./decorator/PermissionDefinitionInterface";
import { InjectRootOptions } from "./decorator/InjectRootOptions";

/**
 * @package module.permission
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionModule
 */
@Module({})
export class PermissionModule implements OnModuleInit {

    /**
     *
     * @param discoveryService
     * @param permissionService
     * @param roleService
     * @param rootOptions
     */
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly permissionService: PermissionService,
        private readonly roleService: RoleService,
        @InjectRootOptions() private readonly rootOptions: RootOptions
    ) {}

    public static forRoot(options: PermissionModuleInitInterface): DynamicModule {
        const providers: Provider[] = [
            {
                provide: Interface(PERMISSION_REPOSITORY_INTERFACE),
                useClass: options.repository.permission
            },
            {
                provide: Interface(ROLE_REPOSITORY_INTERFACE),
                useClass: options.repository.role
            },
            RoleService,
            PermissionService,
            {
                provide: ROOT_OPTIONS,
                useValue: {
                    name: options.root?.name || "root"
                } as RootOptions
            }
        ];

        const prefix = options.controller?.prefix || "";
        Controller(prefix)(PermissionController)
        Controller(prefix)(RoleController)

        return {
            imports: [
                DiscoveryModule
            ],
            controllers: [
                PermissionController,
                RoleController
            ],
            module: PermissionModule,
            providers,
            exports: providers
        }
    }

    public async onModuleInit(): Promise<void> {
        await this.initPermissions();
        await this.initRoles();
    }

    private async initPermissions(): Promise<void> {
        const methodsWithPermissions = await this.discoveryService.controllerMethodsWithMetaAtKey('permissions');

        const permissions: PermissionDefinitionInterface[] = methodsWithPermissions.map(method => {
            return (method.meta) as PermissionDefinitionInterface[];
        })
            .reduce((accum, item) => {
                accum.push(...item);

                return accum;
            }, [] as PermissionDefinitionInterface[]);

        for(const permission of permissions) {
            await this.permissionService.define(permission.name || permission.permission, permission.permission);
        }
    }

    private async initRoles(): Promise<void> {
        await this.roleService.define({
            name: this.rootOptions.name,
            persistence: true,
            title: this.rootOptions.name
        });
    }

}
