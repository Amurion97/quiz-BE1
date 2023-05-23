import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";

class AirportService {
    private airportRepository = AppDataSource.getRepository(Airport);

    all = async () => {
        return await this.airportRepository.find()
    }
}

export default new AirportService();