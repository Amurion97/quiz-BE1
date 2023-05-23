import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Seat} from "./Seat";
import {User} from "./User";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Seat)
    @JoinColumn()
    seat: number;
    @ManyToOne(() => User, (user) => user.booking)
    user: number;

    @Column({
        default: 0
    })
    isConfirmed: boolean;
}