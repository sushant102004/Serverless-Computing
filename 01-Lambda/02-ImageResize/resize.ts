import fs from 'fs'
import os from 'os'
import { APIGatewayProxyResult, SNSEvent } from 'aws-lambda'
import imageMagik from 'imagemagick'
import uuid from 'uuid'
import { promisify } from 'util'
import AWS from 'aws-sdk'

AWS.config.update({ region: 'ap-south-1' })
const s3 = new AWS.S3()

const resizeAsync = promisify(imageMagik.resize)
const readFileAsync = promisify(fs.readFile)
const unlinkAsync = promisify(fs.unlink)


export const handler = async (event: SNSEvent, response: APIGatewayProxyResult) => {
    try {
        event.Records.map(async (record: any) => {
            let bucket = record.s3.bucket.name
            let filename: string = record.s3.object.key

            let params = {
                Bucket: bucket,
                Key: filename
            }

            let inputImage = await s3.getObject(params).promise()

            let tempFile = os.tmpdir() + '/' + uuid.v4() + '.jpg'

            let resizeArgs: imageMagik.Options = {
                srcData: inputImage.Body?.toString(),
                dstPath: tempFile,
                width: 150
            }
            await resizeAsync(resizeArgs)

            let resizedData = await readFileAsync(tempFile)

            let targetFileName = filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg'

            let newParams = {
                Bucket: bucket,
                Key: targetFileName,
                Body: new Buffer(resizedData),
                ContentType: 'image/jpeg'
            }

            await s3.putObject(newParams).promise()
            await unlinkAsync(tempFile)
        })

        return {
            stausCode: 200,
            body: JSON.stringify({
                message: 'Images Resized'
            })
        }

    } catch (err) {
        console.log('Error: ' + err)

        const response: APIGatewayProxyResult = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        }
        return response
    }
}