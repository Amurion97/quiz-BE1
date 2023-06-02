import {AppDataSource} from "../data-source";
import {Aircraft} from "../entity/Aircraft";

class AircraftService {
    private aircraftRepository = AppDataSource.getRepository(Aircraft)
    all = async () => {
        return await this.aircraftRepository.find({
            relations: {
                airline: true
            }
        })
    }
    allOfAnAirline = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .where("airline.id = :id", {id: id})
            .getMany()

        //below code is not fixable
        return await this.aircraftRepository.find({
            where: {
                airline: id
            },
            relations: {
                airline: true
            }
        })
    }
    one = async (id) => {
        return await this.aircraftRepository.findOne({
            where: {
                id: id
            },
            relations: {
                airline: true
            }
        })
    }

    save = async (aircraft) => {
        await this.aircraftRepository.save(aircraft)
    }

    update = async (id, aircraft) => {
        await this.aircraftRepository.update({id: id}, aircraft)
    }

    delete = async (id) => {
        await this.aircraftRepository.delete({id: id})
    }
}

export default new AircraftService();