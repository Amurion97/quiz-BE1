import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Airline} from "./Airline";
import {Flight} from "./Flight";

@Entity()
export class Aircraft {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToOne(() => Airline, (airline) => airline.aircraft)
    airline: Airline;
    @OneToMany(() => Flight, (flight) => flight.aircraft)
    flights: Flight[];
}