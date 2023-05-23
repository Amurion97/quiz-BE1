import {AppDataSource} from "../data-source";
import {Role} from "../entity/Role";

class RoleService {
    private roleRepository = AppDataSource.getRepository(Role);

    all = async () => {
        return await this.roleRepository.find()
    }

    save = async (role) => {
        await this.roleRepository.save(role);
    }

    update = async (id, role) => {
        await this.roleRepository.update({id: id}, role);
    }

    delete = async (id) => {
        await this.roleRepository.delete({id: id});
    }
}

export default new RoleService();
