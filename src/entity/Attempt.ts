import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Test} from "./Test";

@Entity("attempts")
export class Attempt {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    finish: Date;
    @Column({
        type: "decimal",
        precision: 4, scale: 1
    })
    score: number;
    @Column()
    corrects: number;
    @Column()
    incorrects: number;

    @ManyToOne(() => User, (user) => user.attempts)
    user: User;
    @ManyToOne(() => Test, (tag) => tag.attempts)
    test: Test
}