import {AppDataSource} from "../data-source";
import {Role} from "../entity/Role";

class RoleService {
    private roleRepository = AppDataSource.getRepository(Role);

    all = async () => {
        return await this.roleRepository.find()
    }
}

export default new RoleService();
