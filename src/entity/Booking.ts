import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Seat} from "./Seat";
import {User} from "./User";
import {Ticket} from "./Ticket";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    fullName: string;
    @Column({
        nullable: true
    })
    phoneNumber: string;
    @Column({
        nullable: true
    })
    email: string;
    @OneToMany(() => Ticket, (ticket) => ticket.booking)
    tickets: Ticket;
    @Column({
        default: 0
    })
    isConfirmed: boolean;
}