import {AppDataSource} from "../data-source";
import {Attempt} from "../entity/Attempt";
import testService from "./testService";
import {Test} from "../entity/Test";
import {Question} from "../entity/Question";
import {Answer} from "../entity/Answer";

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
                user: true,
                test: {
                    tags:true
                },
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
        // console.log("test:", test.details[1].question.answers)
        let corrects = 0;
        test.details.forEach((item, index) => {
            if (this.checkCorrectness(answers[index], item.question) == true) {
                corrects++
            }
        });
        attempt.corrects = corrects;
        attempt.incorrects = test.details.length - corrects;
        attempt.score = parseFloat((corrects * 100 / test.details.length).toFixed(1));
        attempt.choices = JSON.stringify(answers);
        return await this.attemptRepository.save(attempt);
    }

    checkCorrectness = (choice: number[] | number, question: Question) => {
        if (question.type.id <= 2) {
            const trueAnswer: Answer = question.answers.find(item => item.isTrue);
            // console.log("trueAnswer:", trueAnswer)
            if (choice == trueAnswer.id) {
                return true
            } else return trueAnswer.id;
        } else {
            const trueAnswers = question.answers.filter(item => item.isTrue);
            const trueAnswerIDs = trueAnswers.map(item => item.id).sort((a, b) => a - b);
            if (typeof choice !== "number" && trueAnswerIDs.length == choice.length) {
                choice = choice.sort((a, b) => a - b);
                let correct = true;
                for (let i = 0; i < trueAnswerIDs.length; i++) {
                    if (trueAnswerIDs[i] != choice[i]) {
                        correct = false;
                        break;
                    }
                }
                if (correct) {
                    return true
                }
            }

            return trueAnswerIDs;
        }
    }
}

export default new AttemptService()
