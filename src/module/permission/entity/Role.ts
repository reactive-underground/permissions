import { Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "roles" })
export class Role {

    @PrimaryGeneratedColumn({name: 'id'})
    @Expose({name: 'id'})
    private id: number;

    @Column({name: 'name', unique: true})
    @Expose({name: 'name'})
    private name: string;

    @Column({name: 'title'})
    @Expose({name: 'title'})
    private title: string;

    @Column({name: 'persistence', default: false})
    @Expose({name: 'persistence'})
    private readonly persistence: boolean;

    public constructor(title: string, name: string, persistence: boolean = false){
        this.title = title;
        this.name = name;
        this.persistence = persistence;
    }

    public changeTitle(title: string) {
        this.title = title;
    }

    public getName() {
        return this.name;
    }

    public getTitle() {
        return this.title;
    }

    public rename(name: string){
        this.name = name;
    }

    public isPersistence() {
        return this.persistence;
    }

    public getId() {
        return this.id;
    }

    public get isAdmin() {
        return this.name === 'admin';
    }
}
