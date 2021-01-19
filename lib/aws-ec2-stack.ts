import * as cdk from '@aws-cdk/core';
import { CfnInternetGateway, CfnVPCGatewayAttachment, DefaultInstanceTenancy, RouterType, Subnet, Vpc } from '@aws-cdk/aws-ec2'


export class AwsEc2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, 'ha4db-vpc', {
      cidr: '10.0.0.0/16',
      defaultInstanceTenancy: DefaultInstanceTenancy.DEFAULT,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      subnetConfiguration: []
    })

    // Public Subnet
    const publicSubnet = new Subnet(this, 'PublicSubnet1c', {
      availabilityZone: 'ap-northeast-1c',
      vpcId: vpc.vpcId,
      cidrBlock: '10.0.0.0/24'
    })

    // Internet Gateway
    const internetGateway = new CfnInternetGateway(this, 'InternetGateway', {})
    new CfnVPCGatewayAttachment(this, 'gateway', {
      vpcId: vpc.vpcId,
      internetGatewayId: internetGateway.ref
    })

    // Router
    publicSubnet.addRoute('PublicSubnetRoute', {
      routerType: RouterType.GATEWAY,
      routerId: internetGateway.ref
    })
  }
}
