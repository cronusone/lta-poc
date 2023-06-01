import { executeApolloSchemaCheck } from '@nutrien/data-product-graphql-utils';

import { SubgraphName } from './';

(async function checkSchema() {
  try {
    await executeApolloSchemaCheck({
      schemaFile: './generated/federated.graphql',
      serviceName: SubgraphName,
    });
  } catch (e) {
    // don't fail on error, this gets reported to Apollo Studio as a separate check
    console.error('stderr' in e ? e.stderr.toString() : e);
  }
})();
