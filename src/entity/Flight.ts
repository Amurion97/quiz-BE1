import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Aircraft} from "./Aircraft";
import {Airport} from "./Airport";
import {Row} from "./Row";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToOne(() => Aircraft, (aircraft) => aircraft.flights)
    aircraft: Aircraft;

    @Column()
    start: Date;
    @Column({nullable: true})
    end: Date;

    @ManyToOne(() => Airport)
    from: Airport;
    @ManyToOne(() => Airport)
    to: Airport;

    @Column({
        default: 0
    })
    isCanceled: boolean;

    @OneToMany(() => Row, (row) => row.flight)
    rows: Row[]
}