import { body } from "express-validator";

export const fileValidRule = () => {
    return [
        body('userId'),
        body('name')
    ]
};

