"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event, context) => {
    const name = context.functionName;
    const version = context.functionVersion;
    const time = context.getRemainingTimeInMillis();
    return {
        statusCode: 200,
        body: JSON.stringify({
            name,
            version,
            time
        })
    };
};
exports.handler = handler;
