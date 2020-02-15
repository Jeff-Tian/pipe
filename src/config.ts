import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { pick } from 'ramda';

const schema = {
    OSS_ACCESS_KEY_ID: typeof String,
    OSS_ACCESS_KEY_SECRET: typeof String,
    OSS_DEFAULT_REGION: typeof String,
    OSS_BUCKET: typeof String,
}

const envPath = path.resolve(__dirname, '../.env');
const config = fs.existsSync(envPath) ? dotenv.parse(fs.readFileSync(envPath, 'utf-8')) : pick(Object.keys(schema), process.env);

export default config