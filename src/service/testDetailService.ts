import {AppDataSource} from "../data-source";
import {TestDetails} from "../entity/TestDetails";

class TestDetailService {
    private testDetailsRepository = AppDataSource.getRepository(TestDetails)

    batchSave = async (test, questionIDList) => {
        for (let i = 0; i < questionIDList.length; i++) {
            let newTestDetail = Object.assign(TestDetails, {
                test: test,
                no: i + 1,
                question: questionIDList[i]
            })
            await this.testDetailsRepository.save(newTestDetail)
        }
    }

    deleteByTest = async (id) => {
        await this.testDetailsRepository.delete({test: id})
    }

}

export default new TestDetailService();