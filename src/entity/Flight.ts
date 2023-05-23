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
    aircraft: number;

    @Column()
    start: Date;
    @Column()
    end: Date;

    @ManyToOne(() => Airport)
    from: number;
    @ManyToOne(() => Airport)
    to: number;

    @Column({
        default: 0
    })
    isCanceled: boolean;

    @OneToMany(() => Row, (row) => row.flight)
    rows: Row[]
}