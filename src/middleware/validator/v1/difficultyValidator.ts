import {body} from "express-validator";
import difficultyService from "../../../service/difficultyService";

export const createDifficultyChain = () => body('difficulty')
    .isObject({strict: true})
    .custom(async value => {
        if (!value["id"]) {
            throw new Error(`No difficulty id provided`)
        }
        const difficulty = await difficultyService.findOne(value["id"]);
        if (!difficulty) {
            throw new Error(`Invalid difficulty id: ${value["id"]}`)
        }
    });


