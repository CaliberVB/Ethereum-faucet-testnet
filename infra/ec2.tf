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
