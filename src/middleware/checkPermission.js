import { fileModel, filePermissionModel } from "../models"

const  canAccessFile = async (req, res, next) =>{
    try {
        const {fileName} = req.params;
        const fileDetails = await fileModel.findOne({name: fileName}); 

        if(!fileDetails) {
            return res.status(404).json({message: 'File does not exists.'})
        }
        const permissionDetails = await filePermissionModel.findOne({userId: fileDetails.userId, allowedUser: req.userData._id}); 
        if(fileDetails.userId == req.userData._id || permissionDetails) {
            next();
            return false;
        }
        return res.status(403).json({message: 'You do not have the access for this file.'})

    } catch (error) {
        console.log(error)
    return res.status(500).json({message: 'Something went wrong'})
        
    }
}

export default canAccessFile;