import {Connection, Repository} from "typeorm";
import { Permission } from "../entity/Permission";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionRepository{
    public get Repo() {
        return this.repository;
    }
    public readonly repository: Repository<Permission> = this.connection.getRepository(Permission);


    public constructor(
        private readonly connection: Connection
    ){}

    public async findAll(): Promise<Permission[]> {
        return await this.repository.find();
    }

    public async getOneById(id: number): Promise<Permission> {
        try {
            return await this.repository.findOneOrFail(id);
        } catch (e) {
            throw new Error("Permission not found.");
        }
    }

    public async findByPermission(permission: string): Promise<Permission|undefined> {
        return await this.repository.findOne({
            where: {
                permission,
            }
        });
    }

    public async save(permission: Permission): Promise<void> {
        await this.repository.save(permission);
    }

    public async update(permission: Permission): Promise<void> {
        await this.repository.save(permission);
    }

    public async removeById(id: number): Promise<void> {
        await this.repository.delete(1);
    }

    public async clear(): Promise<void> {
        await this.repository.delete({});
    }
}
