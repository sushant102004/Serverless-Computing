"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    let result;
    const { opOne, opTwo } = event.inputData;
    if (!opOne || !opTwo) {
        throw new Error('Operands not specifies.');
    }
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
};
exports.handler = handler;
