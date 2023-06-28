import {AppDataSource} from "../data-source";
import {Type} from "../entity/Type";

class TypeService {
    private typeRepository = AppDataSource.getRepository(Type)
    findAll = async () => {
        return await this.typeRepository.find({
            order: {
                id: "ASC",
            }
        })
    }
    findOne = async (id) => {
        return await this.typeRepository.findOneBy({id: id})
    }
    save = async (type) => {
        console.log(await this.typeRepository.save(type))
    }

    update = async (id, type) => {
        await this.typeRepository.update({id: id}, type)
    }

    delete = async (id) => {
        await this.typeRepository.delete({id: id})
    }

}

export default new TypeService();