import { Injectable, Logger } from "@nestjs/common";
import { PermissionRepository } from "../repository/PermissionRepository";
import {CreatePermissionData} from "../dto/CreatePermissionData";
import {EditPermissionData} from "../dto/EditPermissionData";
import { RolesRepository } from "../repository/RolesRepository";
import { Permission } from "../entity/Permission";
import { PermissionInterface } from "../interface/PermissionInterface";
import { PermissionSubjectInterface } from "../interface/PermissionSubjectInterface";

/**
 * @package module.permission
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class PermissionService
 */
@Injectable()
export class PermissionService {

    private readonly logger: Logger = new Logger('PermissionService');
    private permissions: Permission[] = [];


    constructor(
        private readonly permissionRepository: PermissionRepository,
        private readonly rolesRepository: RolesRepository,
    ) {
        this.fetch();
    }

    public async fetch(): Promise<Permission[]> {
        this.permissions = await this.permissionRepository.findAll();

        return this.permissions;
    }

    public async hasAccess(subject: PermissionSubjectInterface, permissions: PermissionInterface[]): Promise<boolean> {

        if(!permissions || !permissions.length) {
            return true;
        }

        if(subject.isRoot()) {
            return true;
        }

        for(const permission of permissions) {
            const entity = this.permissions.find(p => p.is(permission.permission));

            if(!entity) {
                return true;
            }

            const roles = await this.rolesRepository.findByIds(subject.getRoles().map(role => role.getId()));

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

        const role = await this.rolesRepository.findByName('admin');

        if(role) {
            permissionEntity.changeRoles([role]);
        }

        await this.permissionRepository.save(permissionEntity);
        await this.fetch();

        this.logger.log(`${permission} initialize`);

        return permissionEntity;
    }

    public async create(data: CreatePermissionData): Promise<Permission> {
        const permission = new Permission(data.name, data.permission);

        if(Array.isArray(data.roleIds)) {
            const roles = await this.rolesRepository.findByIds(data.roleIds);
            permission.changeRoles(roles);
        }

        await this.permissionRepository.save(permission);
        await this.fetch();

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
            const roles = await this.rolesRepository.findByIds(data.roleIds);
            permission.changeRoles(roles);
        }


        await this.permissionRepository.update(permission);
        await this.fetch();

        return permission;
    }

    public async remove(id: number): Promise<void> {
        await this.permissionRepository.removeById(id);
        await this.fetch();
    }

}
