import {AppDataSource} from "../data-source";
import {TestDetails} from "../entity/TestDetails";
import questionService from "./questionService";

class TestDetailService {
    private testDetailsRepository = AppDataSource.getRepository(TestDetails)

    batchSave = async (test, questionIDList) => {
        for (let i = 0; i < questionIDList.length; i++) {
            let newTestDetail = new TestDetails()
            newTestDetail.test = test;
            newTestDetail.no = i + 1;
            newTestDetail.question = await questionService.one(questionIDList[i])
            await this.testDetailsRepository.save(newTestDetail)
        }
    }

    deleteByTest = async (id) => {
        await this.testDetailsRepository.delete({test: id})
    }

}

export default new TestDetailService();