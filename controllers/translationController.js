const Translation = require('../models/translation');
const catchAsyncErrors = require('../utils/catchAsync');
const { translate } = require('bing-translate-api');

// API - Business Logic Implementation for Translation Endpoint v1
exports.getTextTranslation = catchAsyncErrors( async (req, res) => {

    // Searching If the data is already present in database
    // If the data is already present, there is no need to query it from API
    const searchResult = await Translation.find({ textMessage: req.body.textMessage, fromLanguage: req.body.fromLanguage, toLanguage: req.body.toLanguage });

    if (searchResult[0] === undefined) {
        try {
            const result = await translate(req.body.textMessage, req.body.fromLanguage, req.body.toLanguage, true);
            const resultHindi = await translate(req.body.textMessage, req.body.fromLanguage, 'hi', true);
            const resultTamil = await translate(req.body.textMessage, req.body.fromLanguage,  'ta', true);
            const resultTelugu = await translate(req.body.textMessage, req.body.fromLanguage,  'te', true);

            // Sending the Requrired data to the end user after the api execution is completed
            res.status(200).json({
                status: 'success',
                data: result
            });

            // Different Objects  **** since the FREE API supports only 1 language at a time ****
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

            // Storing the data in the database to be used for later.
            await Translation.create(myObj);
            await Translation.create(myObjHindi);
            await Translation.create(myObjTamil);
            await Translation.create(myObjTelugu);



        } catch (err) {
            // If an error occurs, there are several layers of error handling implemented
            // First the Async Error handler, followed by this catch statement.
            res.status(400).json({
                status: 'fail',
                error: err.message
            })
        }

    } else {
        // If data is already present in the database,
        // Here we can get the data from the database.
        // Also displaying the type of the data as cache for better understanding.
        res.status(200).json({
            status: 'cached',
            data: searchResult[0]
        });
    }


});
