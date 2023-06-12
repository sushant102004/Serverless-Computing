"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler = async (event) => {
    try {
        let result;
        const { opOne, opTwo } = event.inputData;
        switch (event.operand) {
            case 'add':
                result = opOne + opTwo;
            case 'subtract':
                result = opOne - opTwo;
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: result
            })
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};
exports.handler = handler;
