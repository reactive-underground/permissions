import { Role } from "./Role";
import { Expose, Exclude } from 'class-transformer';
import { JoinTable, ManyToMany, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { PermissionInterface } from "./PermissionInterface";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: "permissions" })
export class Permission implements PermissionInterface {

    @PrimaryGeneratedColumn({name: 'id'})
    @Expose({name: 'id'})
    @ApiProperty()
    private id!: number;

    @Column({name: 'name'})
    @Expose({name: 'name'})
    @ApiProperty()
    private name: string;

    @Column({ name: 'permission', unique: true })
    @Expose({name: 'permission'})
    @ApiProperty()
    private permission: string;

    @ManyToMany(() => Role, {eager: true})
    @JoinTable({
        joinColumn: {name: 'permissions_id', referencedColumnName: "id"},
        inverseJoinColumn: {name: 'roles_id', referencedColumnName: "id"}
    })
    @Exclude()
    private roles!: Role[];

    public constructor(name: string, permission: string){
        this.name = name;
        this.permission = permission;
    }

    public hasAccess(roles: Role[]): boolean {
        return this.isAccess(roles);
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getPermission() {
        return this.permission;
    }

    public changeName(name: string) {
        this.name = name;
    }


    public edit(permission: string){
        this.permission = permission;
    }

    public hasRole(role: Role): boolean {
        return this.roles.some((item: Role) => item.getId() === role.getId());
    }

    public isAccess (roles: Role[]): boolean {
        return roles.some((role) => this.hasRole(role));
    }

    public changeRoles(roles: Role[]) {
        this.roles = roles;
    }

    @Expose({name: 'roles'})
    @ApiProperty({
        type: Role,
        isArray: true
    })
    public getRoles() {
        return this.roles || [];
    }

    public is(permission: string): boolean {
        return this.permission === permission;
    }
}
