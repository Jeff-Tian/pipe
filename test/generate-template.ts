import config from '../src/config'
import assert = require('assert');
import path from 'path';
import fs from 'fs';

describe('generate template', () => {
    it('generates', async () => {
        const templatePath = path.resolve(__dirname, '../template.yml.tpl');
        const ymlPath = path.resolve(__dirname, '../template.yml');

        let template = fs.readFileSync(templatePath, 'utf-8');
        template = template.replace(/\$\{([^${}]+)\}/g, (match, g1) => {
            return config[g1];
        });
        fs.writeFileSync(ymlPath, template);

        assert(fs.existsSync(ymlPath));
    })
})
