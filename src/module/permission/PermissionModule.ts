import { DynamicModule, Module, Provider } from "@nestjs/common";
import {RoleService} from "./service/RoleService";
import {PermissionService} from "./service/PermissionService";
import { DiscoveryModule } from "@nestjs-plus/discovery";
import { Interface } from "./decorator/Interface";
import { PERMISSION_REPOSITORY_INTERFACE, ROLE_REPOSITORY_INTERFACE } from "./constants/constants";
import { PermissionModuleInitInterface } from "./PermissionModuleInitInterface";

/**
 * @package module.permission
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionModule
 */
@Module({})
export class PermissionModule {
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
            PermissionService
        ];
        return {
            module: PermissionModule,
            imports: [
                DiscoveryModule
            ],
            providers,
            exports: providers
        }
    }
}
