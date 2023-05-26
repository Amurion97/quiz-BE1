import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";

class AirportService {
    private airportRepository = AppDataSource.getRepository(Airport);
    all = async () => {
        return await this.airportRepository.find()
        // return await AppDataSource.createQueryBuilder()
        //     .select("airport")
        //     .from(Airport, "airport")
        //     .getMany()
    }
}

export default new AirportService();