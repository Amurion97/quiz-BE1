import {body} from "express-validator";
import typeService from "../../../service/typeService";

export const createTypeChain = () => body('type')
    .isObject({strict: true})
    .custom(async value => {
        if (!value["id"]) {
            throw new Error(`No type id provided`)
        }
        const type = await typeService.findOne(value["id"]);
        if (!type) {
            throw new Error(`Invalid type id: ${value["id"]}`)
        }
    });

