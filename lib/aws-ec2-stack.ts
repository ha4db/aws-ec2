import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as iam from '@aws-cdk/aws-iam'
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2"
import * as targets from "@aws-cdk/aws-elasticloadbalancingv2-targets"
import { listenerCount } from 'process'

export class AwsEc2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // VPC
    const vpc = new ec2.Vpc(this, 'ha4db-vpc', {
      cidr: '10.0.0.0/16',
      defaultInstanceTenancy: ec2.DefaultInstanceTenancy.DEFAULT,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [{
        name: "public",
        subnetType: ec2.SubnetType.PUBLIC,
        cidrMask: 24
      }, {
        name: "private",
        subnetType: ec2.SubnetType.PRIVATE,
        cidrMask: 24
      }]
    })

    // Role
    const role = new iam.Role(this, 'ha4db-instance-role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonSSMManagedInstanceCore'
        )
      ]
    })

    // ALB Security Group
    const albSg = new ec2.SecurityGroup(this, 'ha4db-alb-sg', {
      vpc: vpc,
      allowAllOutbound: true,
    })

    // Instance Security Group
    const instanceSg = new ec2.SecurityGroup(this, 'ha4db-instance-security-group', {
      vpc: vpc,
      allowAllOutbound: true
    })
    instanceSg.addIngressRule(albSg, ec2.Port.tcp(3000))

    // EC2 Instance
    const ami = 'ami-0f2dd5fc989207c82' // Ubuntu 20.04 LTS
    const machineImage = ec2.MachineImage.genericLinux({
      'ap-northeast-1': ami
    })
    const instance = new ec2.Instance(this, 'ha4db-main', {
      vpc,
      instanceType: new ec2.InstanceType('t2.small'),
      machineImage: machineImage,
      role,
      blockDevices: [
        {
          deviceName: '/dev/sda1',
          volume: ec2.BlockDeviceVolume.ebs(10),
        }
      ],
      securityGroup: instanceSg
    })

    // ALB
    const alb = new elbv2.ApplicationLoadBalancer(this, 'ha4db-alb', {
      vpc,
      internetFacing: true,
      securityGroup: albSg
    })

    // ALB listener
    const listener = alb.addListener('ha4db-alb-listener', {
      port: 80
    })

    // ALB listener target
    listener.addTargets('ha4db-alb-target', {
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [new targets.InstanceTarget(instance)],
      healthCheck: {
        path: '/status.json'
      }
    })
  }
}
