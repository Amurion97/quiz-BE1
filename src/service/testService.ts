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

    private orderOptions(query) {
        const order = (query.order == "ASC") ? "ASC" : "DESC";
        const key = query.key.toUpperCase() == 'TIME' ? 'time' : 'difficulty'
        return {
            order:
                query.key.toUpperCase() == 'TIME' ?
                    {
                        time: order
                    } : {
                        difficulty: order

                    }
            ,
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
        query.sortKey = query.sortKey ? query.sortKey.toString() : ""
        query.order = query.order ?
            ((query.order.toUpperCase() == "DESC") ? "DESC" : "ASC")
            : "ASC"
    }

    findAll = async (query) => {
        console.log("queries:", query);
        this.queryProcess(query)
        const [tests, testCount] = await this.testRepository.findAndCount({
            ...this.whereOptions(query),
            relations: {
                tags: true,
                difficulty: true,
                details: true
            },
            // ...this.orderOptions(query),
            order: {
                ...(query.sortKey.toUpperCase() == 'TIME' ?
                    {
                        time: query.order
                    } : (query.sortKey.toUpperCase() == 'DIFFICULTY' ? {
                        difficulty: {
                            id: query.order
                        }
                    } : {id: "ASC"}))
                ,
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
                }
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
