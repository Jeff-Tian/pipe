/*
if you open the initializer feature, please implement the initializer function, as below:
module.exports.initializer = function(context, callback) {
  console.log('initializing');
  callback(null, '');
};
*/
import config from './config';

const OSS = require('ali-oss');
const axios = require('axios').default;
const FileNameExpert = require('file-name-expert').default;

async function uploadToOss(context, stream, fileName) {
  let client = new OSS({
    region: `oss-${config.OSS_REGION || context.region}`,
    accessKeyId: config.OSS_ACCESS_KEY_ID || context.credentials.accessKeyId,
    accessKeySecret: config.OSS_ACCESS_KEY_SECRET || context.credentials.accessKeySecret,
    stsToken: config.OSS_STS_TOKEN || context.credentials.securityToken,
    bucket: config.OSS_BUCKET
  });

  let result = await client.put(fileName, stream, {
    timeout: 1000 * 60 * 10
  });
  await client.putACL(fileName, 'public-read');

  return result.url.replace('-internal.aliyuncs.com/', '.aliyuncs.com/').replace('http://', 'https://');
}

export const handler = async (request, response, context) => {
  const sourceFileUrl = encodeURI(decodeURIComponent(request.queries.file));
  console.log('hello world, from typescript');

  const fileFullName = FileNameExpert.getFileFullNameFromUrl(sourceFileUrl);
  const { data } = await axios({
    method: 'get',
    url: sourceFileUrl,
    responseType: 'stream'
  })
  const ossFileLink = await uploadToOss(context, data, '/pipe/' + fileFullName)

  response.setStatusCode(200);
  response.send(JSON.stringify({
    message: 'hello world, from typescript',
    ...request.queries,
    sourceFileUrl,
    ossFileLink
  }));
};
