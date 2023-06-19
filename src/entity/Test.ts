import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Type} from "./Type";
import {Difficulty} from "./Difficulty";
import {Tag} from "./Tag";
import {TestDetails} from "./TestDetails";

@Entity("tests")
export class Test {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToOne(() => Difficulty, (difficulty) => difficulty.questions)
    difficulty: Difficulty;
    @ManyToMany(() => Tag, (tag) => tag.questions,
        {
            cascade: true,
        })
    @JoinTable()
    tags: Tag[]

    @OneToMany(() => TestDetails, (detail) => detail.test)
    details: TestDetails
}