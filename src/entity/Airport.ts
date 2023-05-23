import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Airport {
    @PrimaryColumn()
    id: number;
    @Column({
        charset: "utf8mb4"
    })
    name: string;
    @Column({
        charset: "utf8mb4"
    })
    city: string;
    @Column({
        charset: "utf8mb4"
    })
    country: string;
    @Column()
    code: string;
}