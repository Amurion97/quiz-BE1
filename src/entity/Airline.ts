import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Aircraft} from "./Aircraft";

@Entity()
export class Airline {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => Aircraft, (aircraft) => aircraft.airline)
    aircraft: Aircraft[];
    @Column()
    imageURL: string;
}