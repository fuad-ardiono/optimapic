import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';

const outputPath = './app/antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);
