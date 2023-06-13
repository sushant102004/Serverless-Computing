import { Context, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: any, context: Context): Promise<APIGatewayProxyResult> => {
    const name = context.functionName
    const version = context.functionVersion
    const time = context.getRemainingTimeInMillis()

    return {
        statusCode: 200,
        body: JSON.stringify({
            name,
            version,
            time
        })
    }

}