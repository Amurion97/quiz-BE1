import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Type} from "./Type";
import {Difficulty} from "./Difficulty";
import {Answer} from "./Answer";
import {Tag} from "./Tag";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    content: string;

    @ManyToOne(() => Type, (type) => type.questions)
    type: Type;
    @ManyToOne(() => Difficulty, (difficulty) => difficulty.questions)
    difficulty: Difficulty;
    @ManyToMany(() => Tag, (tag) => tag.questions,
        {
            cascade: true,
        })
    @JoinTable()
    tags: Tag[]
    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]
}