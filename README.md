# Ha4db instance

This is a project for ha4db deploy.

## How to use

### setup instance

```sh
export CDK_DEFAULT_ACCOUNT=your-aws-account
export CDK_DEFAULT_REGION=your-aws-region
npm install -g aws-cdk
npm install
cdk deploy --profile your-profile
# run bootstrap
cdk bootstrap aws://xxxxxxxxx/your-aws-region --profile your-profile
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

## Context

You can change value with context.

```sh
cdk deploy --profile your-profile -c instance_type=t2.xlarge
```

### Supported context

- `instance_type`: instance type (default: t2.small)
- `ebs_volume_size`: ebs volume size of instance (default: 10)
- `parent_domain_name`: hosting zone name. It requires `.` at latest (ex. example.com.) (default: null)
- `domain_name`: domain name (default: null)
  