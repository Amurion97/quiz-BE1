import {AppDataSource} from "../data-source";
import {Airline} from "../entity/Airline";

class AirlineService {
    private airlineRepository = AppDataSource.getRepository(Airline)
    all = async () => {
        return await this.airlineRepository.find()
    }

    one = async (id) => {
        return await this.airlineRepository.findOneBy({
            id: id
        })
    }

    save = async (airline) => {
        await this.airlineRepository.save(airline)
    }

    update = async (id, airline) => {
        await this.airlineRepository.update({id: id}, airline)
    }

    delete = async (id) => {
        await this.airlineRepository.delete({id: id})
    }
}

export default new AirlineService();