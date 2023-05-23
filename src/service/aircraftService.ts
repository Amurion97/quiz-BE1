import {AppDataSource} from "../data-source";
import {Aircraft} from "../entity/Aircraft";

class AirlineService {

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .getMany()
    }
}

export default new AirlineService();