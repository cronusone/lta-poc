import fs from 'fs';
import path from 'path';

import { generateSubgraphSchema } from '@nutrien/data-product-graphql-utils';

const LAMBDA_PATH = '../../lambdas';

const writeLocalSchema = (basepath: string): void => {
  const dir = path.dirname(basepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const schemas = generateSubgraphSchema({
    lambdaPath: LAMBDA_PATH,
    additionalSchemas: [],
  });
  for (const [name, schema] of Object.entries(schemas)) {
    const fileName = path.resolve(basepath, `${name}.graphql`);
    fs.writeFileSync(fileName, schema, {
      encoding: 'utf-8',
    });

    console.info(`Wrote schema to ${fileName}`);
  }
};

if (!fs.existsSync('./generated/')) {
  fs.mkdirSync('./generated/');
}

writeLocalSchema('./generated');
