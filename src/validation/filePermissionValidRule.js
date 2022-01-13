import { body } from "express-validator"

export const filePermissionValidRule = () => {
    return [
        body('userId'),
        body('allowedUser')
    ]
}