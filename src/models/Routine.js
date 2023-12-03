const {Schema, model} = require('mongoose');

const RoutineSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }    
}, {
    timestamps: true
});

module.exports = model('Routine', RoutineSchema);