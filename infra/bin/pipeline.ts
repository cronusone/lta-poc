#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { PipelineStack } from '../cdk/PipelineStack';

new PipelineStack(new cdk.App(), 'customer-pipeline');
