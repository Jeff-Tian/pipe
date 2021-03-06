ROSTemplateFormatVersion: "2015-09-01"
Transform: "Aliyun::Serverless-2018-04-03"
Resources:
  pipe: # service name
    Type: "Aliyun::Serverless::Service"
    Properties:
      Description: "The code is transferred from es6 to es5 and packaged as a single file"
    file: # function name
      Type: "Aliyun::Serverless::Function"
      Properties:
        Handler: index.handler
        Runtime: nodejs8
        CodeUri: "./dist"
        Timeout: 600
        MemorySize: 2048
        EnvironmentVariables:
          OSS_REGION: ${OSS_REGION}
          OSS_BUCKET: ${OSS_BUCKET}
          OSS_ACCESS_KEY_ID: ${OSS_ACCESS_KEY_ID}
          OSS_ACCESS_KEY_SECRET: ${OSS_ACCESS_KEY_SECRET}
          OSS_STS_TOKEN: ${OSS_STS_TOKEN}
      Events:
        http-trigger:
          Type: HTTP
          Properties:
            AuthType: ANONYMOUS
            Methods: ["GET", "POST", "PUT"]
