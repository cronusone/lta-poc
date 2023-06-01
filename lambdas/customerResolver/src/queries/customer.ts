import type { AppSyncResolverHandler } from 'aws-lambda';

import { Query, QueryCustomerByIdArgs } from '../schema';

export const customerById: AppSyncResolverHandler<
  QueryCustomerByIdArgs,
  Query['customerById']
> = async (event) => {
  return {
    id: event.arguments.id,
    message: 'placeholder message',
  };
};
