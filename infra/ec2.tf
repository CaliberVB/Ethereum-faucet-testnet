resource "aws_instance" "app-server" {
  count                  = var.number_computer
  ami                    = "ami-091a58610910a87a9"
  instance_type          = "t3.medium"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]
  key_name               = aws_key_pair.ssh_key.key_name
  availability_zone      = var.azs[count.index]
  subnet_id              = aws_subnet.public_subnets[count.index].id

  tags = merge(
    { Name = "app-server-${count.index}" },
    local.tags
  )

  root_block_device {
    volume_size = 50
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

