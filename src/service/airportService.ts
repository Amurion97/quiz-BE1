import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";

class AirportService {

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("airport")
            .from(Airport, "airport")
            .getMany()
    }
}

export default new AirportService();