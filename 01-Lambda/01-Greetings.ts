import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

interface LanguagesGreet {
    [key: string] : string
}

const language : LanguagesGreet = {
    'en': 'Hello',
    'hi': 'Namaste',
    'fr': 'Bonjour'
}

export const handler = async (event: APIGatewayEvent, response: APIGatewayProxyResult): Promise<APIGatewayProxyResult> => {
    try {
        let name = event.pathParameters?.name
        let lang : string = event.queryStringParameters?.language || 'en'

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `${language[lang]}, ${name}`
            })
        }

    } catch (err) {
        console.error('Error:', err);

        const response: APIGatewayProxyResult = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return response;
    }
}