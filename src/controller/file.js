import { fileModel } from "../models";
import { successHandler, errorHandler } from "../helper/responseHandler";
import { allConstants } from "../constant";

export const fileListing = async (req, res) => {
    try {
        const {_id} = req.userData;
        const fileResult = await fileModel.find({_id: {$ne: _id}});
        successHandler(res, 200, allConstants.UPLOAD_FILE_RECORD_FOUND, fileResult);
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};
