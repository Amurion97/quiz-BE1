import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Seat} from "./Seat";
import {User} from "./User";
import {Booking} from "./Booking";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Seat)
    @JoinColumn()
    seat: Seat;
    @ManyToOne(() => Booking, (booking) => booking.tickets)
    booking: Booking;
    @Column()
    firstName: string;
    @Column({
        nullable: true
    })
    middleName: string
    @Column()
    lastName: string;
    @Column()
    dob: Date;
    @Column({
        nullable: true
    })
    idNo: string;
    @Column()
    price: number;
}