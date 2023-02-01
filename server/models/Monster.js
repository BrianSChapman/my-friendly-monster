const { Schema, Types, model } = require('mongoose');

const monsterSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        trim: true,
        required: true
    }
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // }
});

const Monster = model('Monster', monsterSchema);

module.exports = Monster;