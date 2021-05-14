const Translation = require('../models/translation');
const catchAsyncErrors = require('../utils/catchAsync');
const { translate } = require('bing-translate-api');

exports.getTextTranslation = catchAsyncErrors( async (req, res) => {
    const searchResult = await Translation.find({ textMessage: req.body.textMessage, fromLanguage: req.body.fromLanguage, toLanguage: req.body.toLanguage });

    if (searchResult[0] === undefined) {
        try {
            const result = await translate(req.body.textMessage, req.body.fromLanguage, req.body.toLanguage, true);
            const resultHindi = await translate(req.body.textMessage, req.body.fromLanguage, 'hi', true);
            const resultTamil = await translate(req.body.textMessage, req.body.fromLanguage,  'ta', true);
            const resultTelugu = await translate(req.body.textMessage, req.body.fromLanguage,  'te', true);

            res.status(200).json({
                status: 'success',
                data: result
            });
            let myObj = {
                textMessage: req.body.textMessage,
                fromLanguage: req.body.fromLanguage,
                toLanguage: req.body.toLanguage,
                translatedMessage: result.translation
            }
            let myObjHindi = {
                textMessage: req.body.textMessage,
                fromLanguage: req.body.fromLanguage,
                toLanguage: 'hi',
                translatedMessage: resultHindi.translation
            }
            let myObjTamil = {
                textMessage: req.body.textMessage,
                fromLanguage: req.body.fromLanguage,
                toLanguage: 'ta',
                translatedMessage: resultTamil.translation
            }
            let myObjTelugu = {
                textMessage: req.body.textMessage,
                fromLanguage: req.body.fromLanguage,
                toLanguage: 'ta',
                translatedMessage: resultTelugu.translation
            }

            await Translation.create(myObj);
            await Translation.create(myObjHindi);
            await Translation.create(myObjTamil);
            await Translation.create(myObjTelugu);



        } catch (err) {
            res.status(400).json({
                status: 'fail',
                error: err.message
            })
        }

    } else {
        res.status(200).json({
            status: 'cached',
            data: searchResult[0]
        });
    }


});
