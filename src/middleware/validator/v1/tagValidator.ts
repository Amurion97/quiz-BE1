import {body} from "express-validator";
import tagService from "../../../service/tagService";

export const createTagsChain = () => body('tags')
    .isArray()
    .custom(async value => {
        for (let i = 0; i < value.length; i++) {
            if (!value[i]["id"]) {
                throw new Error(`No tag id provided at index: ${i}`)
            }
            const tag = await tagService.findOne(value[i]["id"]);
            console.log(value[i]["id"], tag)
            if (!tag) {
                throw new Error(`Invalid tag id: ${value[i]["id"]}`)
            }
        }
    });




