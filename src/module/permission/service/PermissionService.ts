import { Injectable, Logger } from "@nestjs/common";
import {CreatePermissionData} from "../dto/CreatePermissionData";
import {EditPermissionData} from "../dto/EditPermissionData";
import { Permission } from "../entity/Permission";
import { PermissionSubjectInterface } from "../guard/PermissionSubjectInterface";
import { InjectRoleRepository } from "../decorator/InjectRoleRepository";
import { PermissionRepositoryInterface, RoleRepositoryInterface } from "../../..";
import { InjectPermissionRepository } from "../decorator/InjectPermissionRepository";
import { PermissionDefinitionInterface } from "../decorator/PermissionDefinitionInterface";
import { InjectRootOptions } from "../decorator/InjectRootOptions";
import { RootOptions } from "../options/RootOptions";

/**
 * @package module.permission
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionService
 */
@Injectable()
export class PermissionService {

    private readonly logger: Logger = new Logger('PermissionService');

    constructor(
        @InjectPermissionRepository() private readonly permissionRepository: PermissionRepositoryInterface,
        @InjectRoleRepository() private readonly roleRepository: RoleRepositoryInterface,
        @InjectRootOptions() private readonly rootOptions: RootOptions
    ) {}

    public async fetch(): Promise<Permission[]> {
        return this.permissionRepository.findAll();
    }

    public async hasAccess(subject: PermissionSubjectInterface, permissions: PermissionDefinitionInterface[]): Promise<boolean> {

        if(!permissions || !permissions.length) {
            return true;
        }

        if(subject.isRoot()) {
            return true;
        }


        for(const permission of permissions) {
            const entity = await this.permissionRepository.findByPermission(permission.permission);

            if(!entity) {
                return true;
            }

            const roles = await this.roleRepository.findByIds(subject.getRoles().map(role => role.getId()));

            if(entity.isAccess(roles)) {
                return true;
            }
        }

        return false;
    }

    public async define(name: string, permission: string): Promise<Permission> {

        const found = await this.permissionRepository.findByPermission(permission);

        if(found) {
            this.logger.log(`${permission} defined already`);
            return found;
        }

        const permissionEntity = new Permission(name, permission);

        const role = await this.roleRepository.findByName(this.rootOptions.name);

        if(role) {
            permissionEntity.changeRoles([role]);
        }

        await this.permissionRepository.save(permissionEntity);

        this.logger.log(`${permission} initialize`);

        return permissionEntity;
    }

    public async create(data: CreatePermissionData): Promise<Permission> {
        const permission = new Permission(data.name, data.permission);

        if(Array.isArray(data.roleIds)) {
            const roles = await this.roleRepository.findByIds(data.roleIds);
            permission.changeRoles(roles);
        }

        await this.permissionRepository.save(permission);

        return permission;
    }

    public async edit(data: EditPermissionData): Promise<Permission> {
        const permission = await this.permissionRepository.getOneById(data.id);


        if(data.name) {
            permission.changeName(data.name);
        }

        if(data.permission) {
            permission.edit(data.permission);
        }

        if(data.roleIds) {
            const roles = await this.roleRepository.findByIds(data.roleIds);
            permission.changeRoles(roles);
        }


        await this.permissionRepository.update(permission);

        return permission;
    }

    public async remove(id: number): Promise<void> {
        await this.permissionRepository.removeById(id);
    }

}
