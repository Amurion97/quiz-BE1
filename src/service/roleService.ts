import {AppDataSource} from "../data-source";
import {Role} from "../entity/Role";

class RoleService {
    private roleRepository = AppDataSource.getRepository(Role);

    all = async () => {
        return await this.roleRepository.find()
    }

    one = async (id) => {
        return await this.roleRepository.findOneBy({id: id})
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
