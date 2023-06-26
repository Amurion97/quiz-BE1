import {AppDataSource} from "../data-source";
import {Like, In} from "typeorm";
import {Test} from "../entity/Test";
import testDetailService from "./testDetailService";

class TestService {
    private testRepository = AppDataSource.getRepository(Test);
    private whereOptions = (query) => {
        const contentCondition = query.name ? {
            name: Like(`%${query.name}%`)
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
    findAll = async (query) => {
        console.log("queries:", query);
        this.queryProcess(query)
        const [tests, testCount] = await this.testRepository.findAndCount({
            ...this.whereOptions(query),
            relations: {
                tags: true,
                difficulty: true,
                details: true,
                attempts: true,
            },
            order: {
                id: "ASC",
            },
            skip: query.page && query.rows ? (query.page - 1) * query.rows : 0,
            take: query.rows ? query.rows : 10,
        })
        return {tests: tests, testCount: testCount}
    }

    findOne = async (id) => {
        return await this.testRepository.findOne({
            where: {
                id: id
            },
            relations: {
                tags: true,
                difficulty: true,
                details: {
                    question: {
                        answers: true,
                        type: true
                    }
                },
                attempts: true,
            },
            order: {
                details: {
                    no: "ASC",
                }
            },
        },)
    }

   findOneBrief = async (id) => {
        return await this.testRepository.findOne({
            where: {
                id: id
            },
            relations: {
                tags: true,
                difficulty: true,
                details: {
                    question: true
                }
            },
            order: {
                details: {
                    no: "ASC",
                },
            },
        },)
    }

    save = async (test) => {
        let newTest = await this.testRepository.save(test);
        await testDetailService.batchSave(newTest, test.questions)
        return newTest;
    }

    delete = async (id) => {
        await testDetailService.deleteByTest(id);
        await this.testRepository.delete({id: id});
    }

}

export default new TestService()
