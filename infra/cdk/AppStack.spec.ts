import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { DataProductAccounts } from '@nutrien/data-product-account-utils';

import { AppStack } from './AppStack';

let template: Template;
beforeAll(() => {
  const app = new cdk.App();
  const stack = new AppStack(app, {
    stackName: 'testing',
    env: DataProductAccounts.customer.dev,
    tags: {},
  });
  template = Template.fromStack(stack);
});

it('should have resolver lambda', () => {
  expect(
    findResourceByName(
      lambda.CfnFunction.CFN_RESOURCE_TYPE_NAME,
      'customerResolver'
    )
  ).toHaveLength(1);
});

function findResourceByName(
  resourceType: string,
  name: string,
  properties: Record<string, unknown> = {}
) {
  const resources = template.findResources(resourceType, {
    Properties: properties,
  });
  return Object.keys(resources)
    .filter((key) => key.includes(name))
    .map((key) => resources[key]);
}
