import {AppDataSource} from "../data-source";
import {Any, ArrayContainedBy, ArrayContains, ArrayOverlap, Between, Equal, IsNull, Like, Not} from "typeorm";
import {Question} from "../entity/Question";
import answerService from "./answerService";
import {In} from "typeorm"
import {Answer} from "../entity/Answer";
import difficultyService from "./difficultyService";
import typeService from "./typeService";
import {query} from "express";

class QuestionService {
    private questionRepository = AppDataSource.getRepository(Question);
    private whereOptions = (query) => {
        return {
            where: {
                content: query.content ? Like(`%${query.content}%`) : Not(IsNull()),
                difficulty: {
                    id: query.difficultiesIDs.length > 0 ? In(query.difficultiesIDs) : Not(IsNull())
                },
                type: {
                    id: query.selectedTypesIDs.length > 0 ? In(query.selectedTypesIDs) : Not(IsNull())
                },
                // tags: {
                //     id: queries.selectedTagIDs.length > 0 ? In(queries.selectedTagIDs) : Not(IsNull())
                // },
                tags: {
                    id: query.selectedTagIDs.length > 0 ? In(query.selectedTagIDs) : Not(IsNull())
                },
                // tags: queries.selectedTagIDs.length > 0 ? ArrayContains(queries.selectedTagIDs) : Not(IsNull())
                // ,
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
        return await this.questionRepository.findAndCount({
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
    }

    one = async (id) => {
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
