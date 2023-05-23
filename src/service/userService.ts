import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";
import {Seat} from "../entity/Seat";

class UserService {
    private userRepository = AppDataSource.getRepository(User);

    createUser = async (user) => {
        let hashedPassword = bcrypt.hashSync(user.password, 10);
        let newUser = new User();
        newUser.name = user.name;
        newUser.phoneNumber = user.phoneNumber;
        newUser.address = user.address;
        newUser.username = user.username;
        newUser.password = hashedPassword;
        newUser.role = 1;
        await this.userRepository.save(newUser);
    }
    checkUser = async (user) => {
        let userFind = await this.userRepository.query(`select *
                                                        from user
                                                        where username = "${user.username}"`);
        let usserFinds = userFind[0]
        console.log(usserFinds)
        if (usserFinds) {
            let pass = await bcrypt.compare(user.password, usserFinds.password);
            if (pass) {
                let payload = {
                    id: usserFinds.id,
                    username: user.username,
                    role: usserFinds.roleId
                }
                console.log(payload)
                return jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                })
            }

        } else {
            return 'khong dung pass';
        }
    }

    findUserById = async (userId) => {
        let userFind = await this.userRepository.findOneBy({
            id: userId
        })
        return userFind;
    }
    updateUser = async (id, user) => {
        user.password = await bcrypt.hash(user.password, 10)
        await this.userRepository.update({id: id}, user);
    }
    checkUsedUsername = async (username) => {
        let user = await this.userRepository.findOne({
            where: {
                username: username,
                // password: user.password
            }
        });
        return !!(user);
    }
    all = async () => {
        let users = await AppDataSource.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .innerJoinAndSelect('user.role', 'role')
            .getMany()
        return users;
    }
}

export default new UserService();
