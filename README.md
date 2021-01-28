# Ha4db instance

This is a project for ha4db deploy.

## How to use

### setup instance

```sh
npm install -g aws-cdk
npm install
cdk deploy --profile your-profile
```

### connect instance and setup

```sh
aws ssm start-session --target your-instance --profile your-profile
```

in instance

```sh
cd ~
git clone https://github.com/ha4db/ansible.git
cd ansible
ansible-playbook ha4db.yml
```

## Remove all

```sh
cdk destroy --profile your-profile
```

# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
