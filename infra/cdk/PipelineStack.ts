import { Construct } from 'constructs';

import {
  DataProductAccounts,
  Environment,
} from '@nutrien/data-product-account-utils';
import { DeploymentPipeline } from '@nutrien/data-product-cdk-constructs';

import { AppStack } from './AppStack';

export class PipelineStack extends DeploymentPipeline {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      awsAccounts: DataProductAccounts.customer,
      repoName: 'customer',
      stages: [
        { name: Environment.dev },
        { name: Environment.sit },
        { name: Environment.pre },
        { name: Environment.prd },
      ],
      primaryOutputDirectory: 'infra/cdk.out/',
      createAppStack: (scope, props) => new AppStack(scope, props),
    });
  }
}
