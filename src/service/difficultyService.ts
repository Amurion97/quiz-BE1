import {AppDataSource} from "../data-source";
import {Difficulty} from "../entity/Difficulty";

class DifficultyService {
    private difficultyRepository = AppDataSource.getRepository(Difficulty)
    all = async () => {
        return await this.difficultyRepository.find({
            order: {
                id: "ASC",
            }
        })
    }
    one = async (id) => {
        return await this.difficultyRepository.findOneBy({id: id})
    }

    save = async (difficulty) => {
        console.log(await this.difficultyRepository.save(difficulty))
    }

    update = async (id, difficulty) => {
        await this.difficultyRepository.update({id: id}, difficulty)
    }

    delete = async (id) => {
        await this.difficultyRepository.delete({id: id})
    }

}

export default new DifficultyService();