import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Test} from "./Test";
import {Room} from "./Room";

@Entity("room_details")
export class RoomDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "[]"})
    choices: string;
    @Column({default: 0})
    corrects: number;
    @Column({default: 0})
    incorrects: number;
    @Column()
    email: string;

    @Column({nullable: true})
    socketId: string;

    @Column({default: true})
    isOnline: boolean;

    @ManyToOne(() => Room)
    room: Room;
}