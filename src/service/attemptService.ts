import {AppDataSource} from "../data-source";
import {Attempt} from "../entity/Attempt";
import testService from "./testService";
import {Test} from "../entity/Test";

class AttemptService {
    private attemptRepository = AppDataSource.getRepository(Attempt);

    findAllByUser = async (id) => {
        return await this.attemptRepository.find({
            where: {
                user: {
                    id: id
                }
            },
            relations: {
                test: true,
                // user: true
            }
        })
    }

    findAllByTest = async (id) => {
        return await this.attemptRepository.find({
            where: {
                test: {
                    id: id
                }
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    email: true
                }
            },
            order: {
                score: "DESC"
            }
        })
    }

    save = async (attempt) => {
        console.log("attempt to save:", attempt);
        const answers = attempt.answers;
        const test = await testService.findOne(attempt.test);
        let corrects = 0;
        test.details.forEach((item, index) => {
            if (item.question.type.id <= 2) {
                const trueAnswerID = item.question.answers.find(item => item.isTrue).id
                if (answers[index] == trueAnswerID) {
                    corrects++
                }
            } else if (item.question.type.id == 3) {
                const trueAnswers = item.question.answers.filter(item => item.isTrue);
                const trueAnswerIDs = trueAnswers.map(item => item.id).sort((a, b) => a - b);
                if (trueAnswerIDs.length == answers[index].length) {
                    answers[index] = answers[index].sort((a, b) => a - b);
                    let correct = true;
                    for (let i = 0; i < trueAnswerIDs.length; i++) {
                        if (trueAnswerIDs[i] != answers[index][i]) {
                            correct = false;
                            break;
                        }
                    }
                    if (correct) {
                        corrects++
                    }
                }
            }
        });
        attempt.corrects = corrects;
        attempt.incorrects = test.details.length - corrects;
        attempt.score = parseFloat((corrects * 100 / test.details.length).toFixed(1));
        return await this.attemptRepository.save(attempt);
    }

}

export default new AttemptService()
