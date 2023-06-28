import {AppDataSource} from "../data-source";
import {Answer} from "../entity/Answer";

class AnswerService {
    private answerRepository = AppDataSource.getRepository(Answer)
    save = async (answer) => {
        await this.answerRepository.save(answer)
    }

    batchSave = async (qsId, answers) => {
        for (let i = 0; i < answers.length; i++) {
            answers[i].question = qsId;
            await this.answerRepository.save(answers[i])
        }
    }

    update = async (id, answer) => {
        await this.answerRepository.update({id: id}, answer)
    }

    delete = async (id) => {
        await this.answerRepository.delete({id: id})
    }

    deleteByQuestion = async (id) => {
        await this.answerRepository.delete({question: id})
    }

}

export default new AnswerService();