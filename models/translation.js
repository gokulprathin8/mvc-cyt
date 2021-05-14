const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
    // apiKey: {
    //     type: String,
    //     required: [true, 'Please provide apiKey to make a api call for translation.'],
    // },
    fromLanguage: {
        type: String,
        required: [true, 'Target language. Language codes to be used are the two-letter codes defined by the ISO 639-1:2002.']
    },
    toLanguage: {
        type: String,
        required: [true, 'Target language. Language codes to be used are the two-letter codes defined by the ISO 639-1:2002.']
    },
    textMessage: {
        type: String,
        required: [true, 'Please provide text to translate.'],
        minlength: [2, 'Text should be at least two character']
    },
    translatedMessage: {
        type: String,
        required: [false, 'Message might not get translated everytime. Hence it is not required!']
    }
}, { timestamps: true });

const Translation = mongoose.model('Translation', translationSchema);
module.exports = Translation;

