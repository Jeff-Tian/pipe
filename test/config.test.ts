import config from '../src/config'
import assert = require('assert');

describe('config', () => {
    it('config exists', async () => {
        assert(config.OSS_REGION === 'cn-shanghai');
    })
})
