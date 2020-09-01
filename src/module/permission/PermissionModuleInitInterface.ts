import { ClassType } from "class-transformer/ClassTransformer";
import { PermissionRepositoryInterface } from "./repository/PermissionRepositoryInterface";
import { RoleRepositoryInterface } from "./repository/RoleRepositoryInterface";
import { RootOptions } from "./options/RootOptions";

export interface PermissionModuleInitInterface {
    repository: {
        permission: ClassType<PermissionRepositoryInterface>,
        role: ClassType<RoleRepositoryInterface>
    };
    controller?: {
        prefix?: string;
    },
    root?: RootOptions
}
