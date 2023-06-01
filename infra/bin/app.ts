import * as cdk from 'aws-cdk-lib';

import { DataProductAccounts } from '@nutrien/data-product-account-utils';
import { AppStackBase } from '@nutrien/data-product-cdk-constructs';

import { AppStack } from '../cdk/AppStack';

const app = new cdk.App();

// current username is the default suffix, can be overridden with
// -c stack-suffix=stacky-mc-stackface
const suffix = AppStackBase.resolveStackSuffix(app);

const stack = new AppStack(app, {
  stackName: `customer-${suffix}`,
  description: `Developer application stack for ${process.env.LOGNAME}`,
  env: DataProductAccounts.customer.dev,
});

cdk.Tags.of(stack).add('owner', process.env.LOGNAME);
