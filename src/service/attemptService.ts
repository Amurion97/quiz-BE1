import {AppDataSource} from "../data-source";
import {Attempt} from "../entity/Attempt";

class AttemptService {
    private attemptRepository = AppDataSource.getRepository(Attempt);

    findAllByUser = async (id) => {
        return await this.attemptRepository.find({
            where: {
                user: {
                    id: id
                }
            },
            relations: {
                test: true,
                // user: true
            }
        })
    }

    findAllByTest = async (id) => {
        return await this.attemptRepository.find({
            where: {
                test: {
                    id: id
                }
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    email: true
                }
            }
        })
    }

    save = async (attempt) => {
        console.log("attempt to save:", attempt)
        return await this.attemptRepository.save(attempt);
    }

}

export default new AttemptService()
