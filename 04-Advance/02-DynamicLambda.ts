import { LambdaClient, InvokeCommand, InvocationRequest } from '@aws-sdk/client-lambda'

const lambda = new LambdaClient({ region: 'ap-south-1' })

export const handler = async (event: any, context : any) => {
    const payload = {
        operation: 'multiply',
        inputData: {
            opOne: event.number,
            opTwo: event.number
        }
    }

    console.log('OP One ' + event.number)

    const input : InvocationRequest = {
        FunctionName: 'calculator',
        InvocationType: 'RequestResponse',
        Payload: new TextEncoder().encode(JSON.stringify(payload)),
    }

    const command = new InvokeCommand(input)

    try {
        const res = await lambda.send(command)
        console.log('Invocation Successfull!!')
        console.log('Payload Data:', new TextDecoder().decode(res.Payload))
    } catch (err) {
        console.error('Error: ' + err)
    }
}