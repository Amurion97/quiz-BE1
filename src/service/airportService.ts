import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";

class AirportService {
    private cityRepository = AppDataSource.getRepository(Airport);

    all = async () => {
        return await this.cityRepository.find()
    }
}

export default new AirportService();