terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket         = "faucet-infra-s3-backend"
    key            = "faucet-project"
    region         = "ap-southeast-1"
    encrypt        = true
    role_arn       = "arn:aws:iam::108533296571:role/Faucet-InfraS3BackendRole"
    dynamodb_table = "faucet-infra-s3-backend"
  }

  required_version = ">= 1.2.0"
}
provider "aws" {
  region = var.region
}

locals {
  tags = {
    project = var.project
  }
}


data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "allow_ssh" {
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "ssh_key" {
  key_name   = "ssh_key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_instance" "app-server" {
  count                  = var.number_computer
  ami                    = "ami-091a58610910a87a9"
  instance_type          = "t3.medium"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]
  key_name               = aws_key_pair.ssh_key.key_name

  tags = merge(
    { Name = "app-server-${count.index}" },
    local.tags
  )

  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 60
  }

  user_data = <<-EOF
    #!/bin/bash
    set -ex
    sudo yum update -y
    sudo yum -y install docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    chkconfig docker on
    sudo curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo reboot
  EOF
}

resource "aws_eip" "app-server-eip" {
  count = var.number_computer

  instance = aws_instance.app-server[count.index].id
  vpc      = true
  depends_on = [
    aws_instance.app-server
  ]

  tags = merge(
    { Name = "eip-app-server-${count.index}" },
    local.tags
  )
}


output "public_ip" {
  value = [aws_eip.app-server-eip.*.public_ip]
}
