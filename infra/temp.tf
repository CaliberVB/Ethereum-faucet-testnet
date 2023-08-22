resource "aws_instance" "temp" {
  ami                    = "ami-091a58610910a87a9"
  instance_type          = "t3.medium"
  vpc_security_group_ids = [aws_security_group.db.id]
  key_name               = aws_key_pair.ssh_key.key_name
  availability_zone      = module.vpc.azs[1]
  subnet_id              = module.vpc.public_subnets[1]

  tags = merge(
    { Name = "temp" },
    local.tags
  )

  root_block_device {
    volume_size = 100
  }


  user_data = <<-EOF
    #!/bin/bash
    set -ex
    sudo yum update -y
    sudo yum -y install docker git htop
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    chkconfig docker on
    sudo curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo reboot
  EOF
}

