import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";

@Entity("answers")
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    content: string;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question;
    @Column()
    isTrue: boolean;
}