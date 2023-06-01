import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import path from 'path';

import {
  AppStackBaseProps,
  AppSyncApi,
  PostDeployStep,
  publishSchemaToApolloPostDeployStep,
  TokenAuthorizerLambda,
} from '@nutrien/data-product-cdk-constructs';
import { SubgraphName } from 'graphql-schema';

import { LAMBDAS_ROOT, PACKAGES_ROOT, REPO_ROOT } from './app-paths';

interface Props {
  stageName: AppStackBaseProps['stageName'];
  lambdaRuntime: lambda.Runtime;
  lambdaEnvironment: lambda.FunctionProps['environment'];
  nodeDependencyLayers: lambda.ILayerVersion[];
  vpc: ec2.IVpc;
}

export class PublicApi extends Construct {
  public readonly postDeploySteps: PostDeployStep[];

  constructor(scope: Construct, props: Props) {
    super(scope, 'graphql');

    const stack = cdk.Stack.of(this);

    const { authorizer } = new TokenAuthorizerLambda(this, 'token-authorizer', {
      availablePermissions: ['read:placeholder', 'write:placeholder'],
      lambdaEnvironment: props.lambdaEnvironment,
      nodeModulesPath: path.resolve(REPO_ROOT, 'node_modules'),
    });

    // dynamically iterate lambda folders to register resolver functions if
    // a graphql schema file is present
    const resolverLambdas = AppSyncApi.loadResolverLambdas(this, {
      root: LAMBDAS_ROOT,
      sharedProps: {
        runtime: props.lambdaRuntime,
        environment: props.lambdaEnvironment,
        layers: props.nodeDependencyLayers,
        vpc: props.vpc,
      },
    });

    // and wire them up to an AppSync API for the schema
    const { api } = new AppSyncApi(this, {
      apiName: stack.stackName,
      schemaPath: path.resolve(
        PACKAGES_ROOT,
        'graphql-schema',
        'generated',
        'appsync.graphql'
      ),
      resolvers: resolverLambdas,
      authorizer,
    });

    // only publish schema when deployed in a "live" environment (dev/sit/pre/prd)
    this.postDeploySteps = props.stageName
      ? [
          publishSchemaToApolloPostDeployStep({
            subgraph: SubgraphName,
            schemaPath: path.resolve(
              PACKAGES_ROOT,
              'graphql-schema',
              'generated',
              'federated.graphql'
            ),
            routingUrl: api.attrGraphQlUrl,
          }),
        ]
      : [];
  }
}
