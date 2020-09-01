import { Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "roles" })
export class Role {

    @PrimaryGeneratedColumn({name: 'id'})
    @Expose({name: 'id'})
    @ApiProperty()
    private id!: number;

    @Column({name: 'name', unique: true})
    @Expose({name: 'name'})
    @ApiProperty()
    private name: string;

    @Column({name: 'title'})
    @Expose({name: 'title'})
    @ApiProperty()
    private title: string;

    @Column({name: 'persistence', default: false})
    @Expose({name: 'persistence'})
    @ApiProperty()
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
}
