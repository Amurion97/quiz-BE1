import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";
// import * as otpGenerator from "otp-generator";
const otpGenerator = require('otp-generator')

class UserService {
    private userRepository = AppDataSource.getRepository(User);

    save = async (user) => {
        let hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword;
        user.role = 3;
        await this.userRepository.save(user);
    }
    loginCheck = async (user) => {
        // let foundUser = await AppDataSource.createQueryBuilder()
        //     .select("user")
        //     .from(User, "user")
        //     .where("user.username = :username", {username: user.username})
        //     .innerJoinAndSelect("user.role", "role")
        //     .getOne()
        let foundUser = await this.userRepository.findOne({
            relations: {
                role: true
            },
            where: {
                email: user.email,
            }
        })
        console.log("foundUser:", foundUser)
        if (foundUser) {
            let pass = await bcrypt.compare(user.password, foundUser.password);
            if (pass) {
                if (foundUser.isLocked) {
                    return {
                        isLocked: true
                    }
                }
                let payload = {
                    id: foundUser.id,
                    email: foundUser.email,
                    role: foundUser.role.id
                }
                return {
                    info: {
                        email: foundUser.email,
                        role: foundUser.role.id
                    },
                    token: jwt.sign(payload, SECRET, {
                        expiresIn: '1h'
                    })
                }
            }
            return null
        }
        return null
    }

    one = async (userId) => {
        let userFind = await this.userRepository.findOneBy({
            id: userId
        })
        return userFind;
    }
    updateUser = async (id, user) => {
        user.password = await bcrypt.hash(user.password, 10)
        await this.userRepository.update({id: id}, user);
    }
    checkUsedEmail = async (email) => {
        let user = await this.userRepository.findOne({
            where: {
                email: email,
                // password: user.password
            }
        });
        return !!(user);
    }
    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .innerJoinAndSelect('user.role', 'role')
            .getMany();
    }
    delete = async (id) => {
        await this.userRepository.delete({id: id});
    }

    passwordReset = async (email) => {
        let user = await this.userRepository.findOneBy({
            email: email
        })
        if (!user) {
            throw new Error("Email not found");
        } else {
            let otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            })
            return "Email sended"
        }
    }
}

export default new UserService();
