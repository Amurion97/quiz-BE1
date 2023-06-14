import {AppDataSource} from "../data-source";
import {Between, Equal, IsNull, Like, Not} from "typeorm";
import {Question} from "../entity/Question";
import answerService from "./answerService";
import {Answer} from "../entity/Answer";
import difficultyService from "./difficultyService";
import typeService from "./typeService";

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
        await answerService.batchSave(newQs, question.answers)
        return newQs;
    }

    update = async (id, question) => {
        question.trueIndex = undefined;
        question.trueIndexes = undefined;
        let targetQuestion = await this.questionRepository.findOne({
            relations: {
                tags: true
            },
            where: {
                id: id
            }
        })
        // targetQuestion.tags = question.tags;
        targetQuestion.tags = targetQuestion.tags.filter(item => false);
        targetQuestion.content = question.content;
        targetQuestion.difficulty = await difficultyService.one(question.difficulty)
        targetQuestion.type = await typeService.one(question.type)

        await AppDataSource.manager.save(targetQuestion);

        targetQuestion = await this.questionRepository.findOne({
            relations: {
                tags: true
            },
            where: {
                id: id
            }
        })
        // await this.questionRepository.update({id: id}, {tags: []})
        console.log("removed tags!:", targetQuestion)

        targetQuestion.tags = question.tags;
        await AppDataSource.manager.save(targetQuestion);
        console.log("tags added")

        question.tags = undefined;
        await answerService.deleteByQuestion(id);
        console.log("answers deleted");
        console.log(await AppDataSource.getRepository(Answer).find({
            relations: {
                question: true
            },
            where: {
                question: {
                    id: id
                }
            }
        }));
        let answers = question.answers;
        // question.answers = null;
        // await this.questionRepository.update({id: id}, question);

        await answerService.batchSave(id, question.answers);
    }

    delete = async (id) => {
        await answerService.deleteByQuestion(id);
        await this.questionRepository.delete({id: id});

    }

}

export default new QuestionService()
