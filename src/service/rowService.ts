import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";
import {Seat} from "../entity/Seat";
import {Row} from "../entity/Row";

class RowService {
    private rowRepository = AppDataSource.getRepository(Row);

    all = async () => {
        let rows = await AppDataSource.createQueryBuilder()
            .select('row')
            .from(Row, 'row')
            .innerJoinAndSelect('row.flight', 'flight')
            .innerJoinAndSelect('row.class', 'class')
            .getMany()
        return rows
    }

    save = async (row) => {
         return await this.rowRepository.save(row);
    }

    update = async (id, row) => {
        await this.rowRepository.update({id: id}, row);
    }

    delete = async (id) => {
        await this.rowRepository.delete({id: id});
    }
}

export default new RowService();
