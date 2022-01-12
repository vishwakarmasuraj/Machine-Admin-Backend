import {Schema, model} from 'mongoose';

const UserModel = new Schema ({
    fullName: {
        type: Schema.Types.String
    },
    email: {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String
    },
    file: {
        type: Schema.Types.String
    },
    url: {
        type: Schema.Types.String
    },
    status: {
        type: Schema.Types.String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {timestamps: true})

module.exports = model('User', UserModel, 'User')