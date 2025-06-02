import * as fs from 'fs';
import * as yaml from 'js-yaml';
import fetch from 'node-fetch';
import * as path from 'path';

const SWAGGER_JSON_URL = 'http://localhost:4000/doc-json';
const OUTPUT_PATH = path.resolve('doc', 'api.yaml');

async function exportSwagger(): Promise<void> {
  try {
    const response = await fetch(SWAGGER_JSON_URL);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const swaggerJson = await response.json();
    const swaggerYaml = yaml.dump(swaggerJson);

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, swaggerYaml, 'utf8');

    console.log(`Swagger YAML successfully saved to: ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Error exporting Swagger YAML:', error);
    process.exit(1);
  }
}

exportSwagger();
