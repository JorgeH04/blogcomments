const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    nombre: String,
    mensaje: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('tasks', TaskSchema);