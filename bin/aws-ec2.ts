#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { AwsEc2Stack } from '../lib/aws-ec2-stack'

const app = new cdk.App()
new AwsEc2Stack(app, 'Ha4dbEc2Stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
