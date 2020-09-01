import { Role } from "../entity/Role";


export interface RoleRepositoryInterface {
    findAll(): Promise<Role[]>;
    findByIds(ids: number[]): Promise<Role[]>;
    save(role: Role): Promise<void>;
    update(role: Role): Promise<void>;
    removeById(id: number): Promise<void>
    getOneById(id: number): Promise<Role>
    findByName(name: string): Promise<Role|undefined>;
}
