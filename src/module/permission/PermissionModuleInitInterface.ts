import { ClassType } from "class-transformer/ClassTransformer";
import { PermissionRepositoryInterface } from "./repository/PermissionRepositoryInterface";
import { RoleRepositoryInterface } from "./repository/RoleRepositoryInterface";

export interface PermissionModuleInitInterface {
    repository: {
        permission: ClassType<PermissionRepositoryInterface>,
        role: ClassType<RoleRepositoryInterface>
    };
}
