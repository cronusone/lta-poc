import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import path from 'path';

import {
  AccountVpc,
  AppStackBase,
  AppStackBaseProps,
  NodeLambdaLayers,
  PostDeploySteps,
} from '@nutrien/data-product-cdk-constructs';

import { name, repository, version } from '../../package.json';
import { LAYERS_NODE_DEPENDENCIES_ROOT } from './app-paths';
import { PublicApi } from './PublicApi';

/**
 * Main stack that defines application resources for the Customer Data Product
 */
export class AppStack extends AppStackBase {
  constructor(scope: Construct, props: AppStackBaseProps) {
    super(scope, props);

    const { vpc } = new AccountVpc(this, 'vpc');

    const lambdaRuntime = lambda.Runtime.NODEJS_16_X;
    const lambdaEnvironment = {
      AWS_APPLICATION_ID: props.stackName,
      NODE_OPTIONS: '--enable-source-maps',
      AWS_XRAY_CONTEXT_MISSING: 'LOG_ERROR',
      SERVICE_NAME: name,
      SERVICE_REPO: repository,
      SERVICE_VERSION: version,
    };

    const { layers: nodeDependencyLayers } = new NodeLambdaLayers(
      this,
      'shared-deps',
      {
        dockerfile: path.resolve(LAYERS_NODE_DEPENDENCIES_ROOT, 'Dockerfile'),
        runtime: lambdaRuntime,
      }
    );

    // create the public API for the data product
    const { postDeploySteps: apiPostDeploySteps } = new PublicApi(this, {
      stageName: props.stageName,
      lambdaRuntime,
      lambdaEnvironment,
      nodeDependencyLayers,
      vpc,
    });

    // trigger actions after deployment is complete such as running database
    // migrations, registering schema changes with Apollo Studio, etc
    new PostDeploySteps(this, {
      tasks: [...apiPostDeploySteps],
    });
  }
}
