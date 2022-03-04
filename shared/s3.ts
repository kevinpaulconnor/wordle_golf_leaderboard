require('dotenv').config();
const aws = require('aws-sdk');
var s3 = new aws.S3();
let bucketName = 'tournamentsbucket233848-dev';
if (process.env.AWS_BRANCH === 'main') {
    bucketName = 'tournamentsbucket223547-main';
}
async function read(filename:string) {
    try {
        const params = {
            Bucket: bucketName,
            Key: filename
        }
        const data = await s3.getObject(params).promise();
        return {
            data: JSON.parse(data.Body),
            lastModified: data.LastModified,
        }
    } catch (e:any) {
        if (e.code === "NoSuchKey") {
            return e.code;
        }
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
}

export function write(item:object, filename:string) {
    const params ={ 
        Bucket : bucketName,
        Key : filename,
        Body: JSON.stringify(item),
    };
    return s3.putObject(params, () => {}).promise();
}

export default read;