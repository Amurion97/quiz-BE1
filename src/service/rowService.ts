import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";
import {Seat} from "../entity/Seat";
import {Row} from "../entity/Row";

class RowService {
    private seatRepository = AppDataSource.getRepository(Row);

    all = async () => {
        let rows = await AppDataSource.createQueryBuilder()
            .select('row')
            .from(Row, 'row')
            .innerJoinAndSelect('row.flight', 'flight')
            .innerJoinAndSelect('row.class', 'class')
            .getMany()
        return rows
    }
}

export default new RowService();
