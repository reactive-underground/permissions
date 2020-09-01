import { Injectable } from "@nestjs/common";
import { CreateRoleData } from "../dto/CreateRoleData";
import { Role } from "../entity/Role";
import { EditRoleData } from "../dto/EditRoleData";
import { RoleRepositoryInterface } from "../../..";
import { InjectRoleRepository } from "../decorator/InjectRoleRepository";

/**
 * @package module.permission.service
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class RoleService
 */
@Injectable()
export class RoleService {
    constructor(
        @InjectRoleRepository() private readonly roleRepository: RoleRepositoryInterface
    ) {}

    public async fetch(): Promise<Role[]> {
        return await this.roleRepository.findAll();
    }

    public async getByIds(ids: number[]): Promise<Role[]> {
        return await this.roleRepository.findByIds(ids);
    }

    public async create(data: CreateRoleData): Promise<Role> {
        const role = new Role(data.title, data.name, data.persistence);
        await this.roleRepository.save(role);
        return role;
    }

    public async edit(data: EditRoleData): Promise<Role> {
        const role = await this.roleRepository.getOneById(data.id);
        if(data.title) {
            role.changeTitle(data.title);
        }
        if(data.name) {
            role.rename(data.name);
        }
        await this.roleRepository.update(role);
        return role;
    }

    public async remove(id: number): Promise<void> {
        await this.roleRepository.removeById(id);
    }
}
