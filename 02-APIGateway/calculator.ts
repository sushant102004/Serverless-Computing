import { APIGatewayProxyResult } from "aws-lambda"

export const handler = async (event: any) : Promise<APIGatewayProxyResult> => {
 
        let result! : number
        const {opOne, opTwo} = event.inputData

        if(!opOne || !opTwo) {
            throw new Error('Operands not specifies.')
        }
    
        switch (event.operand) {
            case 'add' :
                result = opOne + opTwo
            case 'subtract' :
                result = opOne - opTwo
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message : result
            })
        }
}