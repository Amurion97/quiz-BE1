import {AppDataSource} from "../data-source";
import {Answer} from "../entity/Answer";

class AnswerService {
    private answerRepository = AppDataSource.getRepository(Answer)
    all = async () => {
        return await this.answerRepository.find({
            relations: {
                question: true
            },
            order: {
                id: "ASC"
            }
        })
    }

    save = async (answer) => {
        await this.answerRepository.save(answer)
    }

    update = async (id, answer) => {
        await this.answerRepository.update({id: id}, answer)
    }

    delete = async (id) => {
        await this.answerRepository.delete({id: id})
    }

}

export default new AnswerService();