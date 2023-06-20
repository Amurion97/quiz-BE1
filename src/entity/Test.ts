import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Difficulty} from "./Difficulty";
import {Tag} from "./Tag";
import {TestDetails} from "./TestDetails";
import {Attempt} from "./Attempt";

@Entity("tests")
export class Test {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({
        nullable: true
    })
    image: string;
    @Column()
    time: number;

    @ManyToOne(() => Difficulty, (difficulty) => difficulty.questions)
    difficulty: Difficulty;
    @ManyToMany(() => Tag, (tag) => tag.questions,
        {
            cascade: true,
        })
    @JoinTable()
    tags: Tag[]

    @OneToMany(() => TestDetails, (detail) => detail.test)
    details: TestDetails[]

    @OneToMany(() => Attempt, (attempt) => attempt.test)
    attempts: Attempt[]
}