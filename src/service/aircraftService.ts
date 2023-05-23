import {AppDataSource} from "../data-source";
import {Airline} from "../entity/Airline";
import {Aircraft} from "../entity/Aircraft";

class AirlineService {
    private aircraftRepository = AppDataSource.getRepository(Aircraft);

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .getMany()
    }
}

export default new AirlineService();