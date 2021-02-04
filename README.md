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

## Context

You can change value with context.

```sh
cdk deploy --profile your-profile -c instance_type=t2.xlarge
```

### Supported context

- `instance_type`: instance type (default: t2.small)
- `ebs_volume_size`: ebs volume size of instance (default: 10)
- `zone_name`: public hosting zone name (default: null)
- `domain_name`: domain name (default: null)
  