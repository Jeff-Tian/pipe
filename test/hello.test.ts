import { handler } from '../src'
import assert = require('assert');

describe('hello', () => {
    it('greets', async () => {
        await handler({
            queries: {
                file: 'http://libre-office.oss-cn-shanghai.aliyuncs.com/example.docx'
            }
        }, { setStatusCode: console.log, send: console.log }, { credentials: {} })

        assert(process.title === 'npm');
    })
})
