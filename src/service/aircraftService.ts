import {AppDataSource} from "../data-source";
import {Aircraft} from "../entity/Aircraft";

class AircraftService {
    private aircraftRepository = AppDataSource.getRepository(Aircraft)
    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .getMany()
    }
    allOfAnAirline = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .where("airline.id = :id", {id: id})
            .getMany()
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
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .where("aircraft.id = :id", {id: id})
            .innerJoinAndSelect("aircraft.airline", "airline")
            .getOne()
    }

    save = async (aircraft) => {
        await AppDataSource.createQueryBuilder()
            .insert()
            .into(Aircraft)
            .values([
                {name: aircraft.name, airline: aircraft.airline}
            ])
            .execute()
    }

    update = async (id, aircraft) => {
        await AppDataSource.createQueryBuilder()
            .update(Aircraft)
            .set({name: aircraft.name, airline: aircraft.airline})
            .where("id = :id", {id: id})
            .execute()
    }

    delete = async (id) => {
        await AppDataSource.createQueryBuilder()
            .delete()
            .from(Aircraft)
            .where("id = :id", {id: id})
            .execute()
    }
}

export default new AircraftService();