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

resource "aws_key_pair" "ssh_key" {
  key_name   = "ssh_key"
  public_key = file("~/.ssh/id_rsa.pub")
}

output "public_ip" {
  value = [aws_eip.app-server-eip.*.public_ip]
}
