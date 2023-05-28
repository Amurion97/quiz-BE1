import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Row} from "./Row";
import {Booking} from "./Booking";

@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    no: number;

    @ManyToOne(() => Row, (row) => row.seats)
    row: Row;

    @Column({
        default: 1
    })
    isAvailable: boolean;

    @OneToOne(() => Booking, (booking) => booking.seat)
    booking: Booking
}