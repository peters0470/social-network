const { Schema, model, Types} = require('mongoose');
// const moment = require('moment');

const ThoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
            
        },
        username: {
            type: String,
            required: true
        }
        
    });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;