import {body} from "express-validator";

export const createContentChain = () => body('content').isString().trim().notEmpty();

