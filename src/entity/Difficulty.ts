import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";
import {Test} from "./Test";

@Entity("difficulties")
export class Difficulty {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        unique: true
    })
    name: string;
    @OneToMany(() => Question, (question) => question.difficulty)
    questions: Question[];
    @OneToMany(() => Test, (test) => test.difficulty)
    tests: Test[];
}