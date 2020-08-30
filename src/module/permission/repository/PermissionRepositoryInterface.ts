import { Permission } from "~/module/permission/entity/Permission";

export interface PermissionRepositoryInterface {
    findAll(): Promise<Permission[]>;
    getOneById(id: number): Promise<Permission>;
    findByPermission(permission: string): Promise<Permission|undefined>;
    save(permission: Permission): Promise<void>;
    update(permission: Permission): Promise<void>;
    removeById(id: number): Promise<void>;
}
