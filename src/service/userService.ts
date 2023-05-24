import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";

class UserService {
    private userRepository = AppDataSource.getRepository(User);

    save = async (user) => {
        let hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword;
        user.role = 3;
        await this.userRepository.save(user);
    }
    loginCheck = async (user) => {
        let foundUser = await AppDataSource.createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.username = :username", {username: user.username})
            .innerJoinAndSelect("user.role", "role")
            .getOne()
        if (foundUser) {
            let pass = await bcrypt.compare(user.password, foundUser.password);
            if (pass) {
                let payload = {
                    id: foundUser.id,
                    username: foundUser.username,
                    role: foundUser.role
                }
                return jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                })
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
        return await AppDataSource.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .innerJoinAndSelect('user.role', 'role')
            .getMany();
    }
}

export default new UserService();
