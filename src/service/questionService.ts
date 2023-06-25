import {AppDataSource} from "../data-source";
import {Like, In} from "typeorm";
import {Question} from "../entity/Question";
import answerService from "./answerService";
import {Answer} from "../entity/Answer";
import difficultyService from "./difficultyService";
import typeService from "./typeService";

class QuestionService {
    private questionRepository = AppDataSource.getRepository(Question);
    private whereOptions = (query) => {
        const contentCondition = query.content ? {
            content: Like(`%${query.content}%`)
        } : {}
        const difficultyCondition = query.difficultiesIDs.length > 0 ? {
            difficulty: {
                id: In(query.difficultiesIDs)
            }
        } : {}
        const typeCondition = query.selectedTypesIDs.length > 0 ? {
            type: {
                id: In(query.selectedTypesIDs)
            }
        } : {}
        const tagCondition = (query.selectedTagIDs.length > 0) ? {
            tags: {
                id: In(query.selectedTagIDs)
            }
        } : {}
        return {
            where: {
                ...contentCondition,
                ...difficultyCondition,
                ...typeCondition,
                ...tagCondition,
            },
        }
    }

    private queryProcess = (query) => {
        if (!query.difficultiesIDs) {
            query.difficultiesIDs = [];
        }
        if (!query.selectedTypesIDs) {
            query.selectedTypesIDs = [];
        }
        if (!query.selectedTagIDs) {
            query.selectedTagIDs = [];
        }
        query.page = query.page ? parseInt(query.page) : undefined;
        query.rows = query.rows ? parseInt(query.rows) : undefined;
    }
    all = async (query) => {
        console.log("queries:", query);
        this.queryProcess(query)
        const [questions, questionCount] = await this.questionRepository.findAndCount({
            ...this.whereOptions(query),
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
            skip: query.page && query.rows ? (query.page - 1) * query.rows : 0,
            take: query.rows ? query.rows : 10,
        })
        return {questions: questions, questionCount: questionCount}
    }

    findOne = async (id) => {
        return await this.questionRepository.findOne({
            where: {
                id: id
            },
            relations: {
                answers: true,
                type: true,
                tags: true,
                difficulty: true,
            },
            order: {
                answers: {
                    id: "ASC"
                }
            },
        },)
    }

    save = async (question) => {
        let foundQs = await this.questionRepository.findOneBy({
            content: question.content
        })
        if (foundQs) {
            return false
        }
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

        await answerService.batchSave(id, question.answers);
    }

    delete = async (id) => {
        await answerService.deleteByQuestion(id);
        await this.questionRepository.delete({id: id});

    }

}

export default new QuestionService()
