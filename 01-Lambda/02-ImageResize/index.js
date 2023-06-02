"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const imagemagick_1 = __importDefault(require("imagemagick"));
const uuid_1 = __importDefault(require("uuid"));
const util_1 = require("util");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: 'ap-south-1' });
const s3 = new aws_sdk_1.default.S3();
const resizeAsync = (0, util_1.promisify)(imagemagick_1.default.resize);
const readFileAsync = (0, util_1.promisify)(fs_1.default.readFile);
const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
const handler = async (event, response) => {
    try {
        event.Records.map(async (record) => {
            let bucket = record.s3.bucket.name;
            let filename = record.s3.object.key;
            let params = {
                Bucket: bucket,
                Key: filename
            };
            let inputImage = await s3.getObject(params).promise();
            let tempFile = os_1.default.tmpdir() + '/' + uuid_1.default.v4() + '.jpg';
            let resizeArgs = {
                srcData: inputImage.Body?.toString(),
                dstPath: tempFile,
                width: 150
            };
            await resizeAsync(resizeArgs);
            let resizedData = await readFileAsync(tempFile);
            let targetFileName = filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg';
            let newParams = {
                Bucket: bucket,
                Key: targetFileName,
                Body: new Buffer(resizedData),
                ContentType: 'image/jpeg'
            };
            await s3.putObject(newParams).promise();
            await unlinkAsync(tempFile);
        });
        return {
            stausCode: 200,
            body: JSON.stringify({
                message: 'Images Resized'
            })
        };
    }
    catch (err) {
        console.log('Error: ' + err);
        const response = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
        return response;
    }
};
exports.handler = handler;
