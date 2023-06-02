"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const language = {
    'en': 'Hello',
    'hi': 'Namaste',
    'fr': 'Bonjour'
};
const handler = async (event, response) => {
    try {
        let name = event.pathParameters?.name;
        let lang = event.queryStringParameters?.language || 'en';
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `${language[lang]}, ${name}`
            })
        };
    }
    catch (err) {
        console.error('Error:', err);
        const response = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
        return response;
    }
};
exports.handler = handler;
