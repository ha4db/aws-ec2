import '@aws-cdk/assert/jest'
import * as cdk from '@aws-cdk/core';
import * as AwsEc2 from '../lib/aws-ec2-stack';

test('VPC', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsEc2.AwsEc2Stack(app, 'MyTestStack');
    // THEN
    expect(stack).toHaveResource('AWS::EC2::VPC', {
      CidrBlock: "10.0.0.0/16",
      Tags: [{ 'Key': 'Name', 'Value': 'MyTestStack/ha4db-vpc'}]
    })
});
