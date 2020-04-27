import { Injectable } from "@nestjs/common";
import RolesRepository from "../repository/RolesRepository";
import {CreateRoleData} from "../dto/CreateRoleData";
import Role from "../entity/Role";
import {EditRoleData} from "../dto/EditRoleData";

/**
 * @package module.permission.service
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class RoleService
 */
@Injectable()
export class RoleService {
    constructor(
        private readonly rolesRepository: RolesRepository
    ) {}

    public async fetch(): Promise<Role[]> {
        return await this.rolesRepository.findAll();
    }

    public async getByIds(ids: number[]): Promise<Role[]> {
        return await this.rolesRepository.findByIds(ids);
    }

    public async create(data: CreateRoleData): Promise<Role> {
        const role = new Role(data.title, data.name, data.persistence);

        await this.rolesRepository.save(role);

        return role;
    }

    public async edit(data: EditRoleData): Promise<Role> {
        const role = await this.rolesRepository.getOneById(data.id);

        if(data.title) {
            role.changeTitle(data.title);
        }

        if(data.name) {
            role.rename(data.name);
        }


        await this.rolesRepository.update(role);

        return role;
    }

    public async remove(id: number): Promise<void> {
        await this.rolesRepository.removeById(id);
    }
}
