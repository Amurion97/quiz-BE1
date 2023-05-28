import {AppDataSource} from "../data-source";
import {Class} from "../entity/Class";

class ClassService {
    private classRepository = AppDataSource.getRepository(Class);
    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("class")
            .from(Class, "class")
            .getMany()
    }
    one = async (id) => {
        return await this.classRepository.findOneBy({
            id: id
        })
    }
}

export default new ClassService();