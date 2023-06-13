import {AppDataSource} from "../data-source";
import {Between, Equal, IsNull, Like, Not} from "typeorm";
import {Question} from "../entity/Question";
import answerService from "./answerService";

class QuestionService {
    private questionRepository = AppDataSource.getRepository(Question);

    all = async (queries) => {
        console.log("queries:", queries);
        return await this.questionRepository.find({
            where: {
                content: queries.content ? Like(`%${queries.content}%`) : Not(IsNull())
            },
            select: {},
            relations: {
                answers: true,
                type: true,
                tags: true,
                difficulty: true,
            },
            order: {
                id: "ASC",

            },
            // skip: queries.skip? queries.skip : 0,
            // take: 10
        })
    }
    one = async (id) => {
        return await this.questionRepository.findOne({
            where: {
                id: id
            },
            relations: {
                answers: true
            },
            order: {},
        },)
    }

    save = async (question) => {
        let newQs = await this.questionRepository.save(question);
        for (let i = 0; i < question.answers.length; i++) {
            question.answers[i].question = newQs;
            await answerService.save(question.answers[i])
        }
        return newQs;
    }

    update = async (id, question) => {
        await this.questionRepository.update({id: id}, question);
    }

    delete = async (id) => {
        await this.questionRepository.delete({id: id});
    }

}

export default new QuestionService()
