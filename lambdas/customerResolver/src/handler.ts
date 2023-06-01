import middy from '@middy/core';

import {
  DataProductError,
  observabilityMiddleware,
} from '@nutrien/data-product-observability';

import { customerById } from './queries';

export const handler = middy(async (event, context, callback) => {
  if (event?.info?.parentTypeName === 'Query') {
    switch (event.info.fieldName) {
      case 'customerById':
        return customerById(event, context, callback);
      default:
        throw new DataProductError('unknown field name', {
          fieldName: event.info.fieldName,
        });
    }
  }
  return null;
}).use(observabilityMiddleware());
