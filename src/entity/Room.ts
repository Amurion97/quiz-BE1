import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Test} from "./Test";

@Entity("rooms")
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;
    @Column({default: 0})
    size: number;
    @Column({default: 1})
    isActive: boolean;

    @ManyToOne(() => User)
    user: User;
    @ManyToOne(() => Test)
    test: Test
}