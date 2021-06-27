import mongoose from 'mongoose';
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    description: String,
    duration: String,
    status: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {collection:'Task'});


export const Task = mongoose.model('Task', taskSchema);