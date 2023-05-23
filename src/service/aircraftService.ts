import {AppDataSource} from "../data-source";
import {Aircraft} from "../entity/Aircraft";
import {Airline} from "../entity/Airline";

class AirlineService {

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .getMany()
    }
    one = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("aircraft")
            .from(Aircraft, "aircraft")
            .where("id = :id", {id: id})
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
            .update(Airline)
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

export default new AirlineService();