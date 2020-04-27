import {Connection, Repository, In} from "typeorm";
import Role from "./../entity/Role";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class RolesRepository{
    public get Repo() {
        return this.repository;
    }
    public readonly repository: Repository<Role> = this.connection.getRepository(Role);

    public constructor(
        private readonly connection: Connection
    ){}

    public async findAll() {
        return this.repository.find();
    }

    public async findByIds(ids: number[]): Promise<Role[]> {
        return await this.repository.find({
            where: {
                id: ids.length ? In(ids) : 0
            }
        })
    }

    public async save(role: Role) {
        await this.repository.save(role);
    }

    public async update(role: Role) {
        await this.repository.save(role);
    }

    public async removeById(id: number) {
        await this.repository.delete(id);
    }

    public async getOneById(id: number) {
        try {
            return await this.repository.findOneOrFail(id);
        } catch (e) {
            throw new Error("Role not found.");
        }
    }

    public async findByName(name: string): Promise<Role|undefined> {
        return await this.repository.findOne({
            where: {
                name: name
            }
        })
    }
}
