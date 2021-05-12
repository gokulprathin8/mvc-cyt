const axios = require('axios').default;
const Translation = require('../models/translation');
const catchAsyncErrors = require('../utils/catchAsync');

exports.getTextTranslation = catchAsyncErrors( async (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://yandextranslatezakutynskyv1.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-rapidapi-key': '8c4a551693msh890dcfa5d9cdb64p1d6628jsnb1c178c40161',
            'x-rapidapi-host': 'YandexTranslatezakutynskyV1.p.rapidapi.com'
        },
        data: {apiKey: req.body.apiKey, lang: req.body.language, text: req.body.textMessage}
    };

    const newTranslation = await Translation.create(req.body);
    axios.request(options).then(function (response) {
        res.status(200).json({
            status: 'success',
            data: response,
            saveToDB: newTranslation
        })
    }).catch(function (error) {
        console.error(error);
    });


});