import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";

@Entity("difficulties")
export class Difficulty {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        unique: true
    })
    name: string;
    @OneToMany(() => Question, (question) => question.type)
    questions: Question[];
}