import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";

@Entity("tags")
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        unique: true
    })
    name: string;
    @ManyToMany(() => Question, (question) => question.tags)
    questions: Question[];
}