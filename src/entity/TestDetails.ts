import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Test} from "./Test";
import {Question} from "./Question";


@Entity("test_details")
export class TestDetails {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    no: number;

    @ManyToOne(() => Question)
    question: Question;
    @ManyToOne(() => Test, (test) => test.details)
    test: Test;
}