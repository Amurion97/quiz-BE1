import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";

class AirportService {
    private airportRepository = AppDataSource.getRepository(Airport);
    all = async () => {
        return await this.airportRepository.find()
    }

    one = async (id) => {
        return await this.airportRepository.findOneBy({
            id: id
        })
    }
    save = async (airport) => {
        await this.airportRepository.save(airport)
    }

    update = async (id, airport) => {
        await this.airportRepository.update({id: id}, airport)
    }

    delete = async (id) => {
        await this.airportRepository.delete({id: id})
    }
}

export default new AirportService();