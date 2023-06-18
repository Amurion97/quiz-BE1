import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255, nullable: true})
    name: string;
    @Column({type: "varchar", length: 255})
    email: string;
    @Column({type: "varchar", length: 255})
    password: string;
    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
    @Column({
        default: 0
    })
    isDeleted: boolean;

    @Column({type: "varchar", length: 20, nullable: true})
    phoneNumber: string;
    @Column({type: "varchar", length: 255, nullable: true})
    address: string;

    @Column({type: "varchar", length: 6, nullable: true})
    OTP: string;
    @Column({nullable: true})
    OTPGenTime: Date;
//will delete later
    @Column({
        default: 0
    })
    isLocked: boolean;
}
