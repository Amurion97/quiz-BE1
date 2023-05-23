import {AppDataSource} from "../data-source";
import {Airline} from "../entity/Airline";

class AirlineService {

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("airline")
            .from(Airline, "airline")
            .getMany()
    }

    one = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("airline")
            .from(Airline, "airline")
            .where("airline.id = :id", {id: id})
            .getOne()
    }

    save = async (airline) => {
        await AppDataSource.createQueryBuilder()
            .insert()
            .into(Airline)
            .values([
                {name: airline.name}
            ])
            .execute()
    }

    update = async (id, airline) => {
        await AppDataSource.createQueryBuilder()
            .update(Airline)
            .set({name: airline.name})
            .where("id = :id", {id: id})
            .execute()
    }

    delete = async (id) => {
        await AppDataSource.createQueryBuilder()
            .delete()
            .from(Airline)
            .where("id = :id", {id: id})
            .execute()
    }
}

export default new AirlineService();