import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()

export class Class {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    name: string;
}