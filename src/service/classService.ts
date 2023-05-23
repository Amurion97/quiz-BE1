import {AppDataSource} from "../data-source";
import {Class} from "../entity/Class";

class ClassService {

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("class")
            .from(Class, "class")
            .getMany()
    }
}

export default new ClassService();