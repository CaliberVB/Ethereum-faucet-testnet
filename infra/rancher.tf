resource "aws_instance" "rancher" {
  ami                    = "ami-091a58610910a87a9"
  instance_type          = "t3.medium"
  vpc_security_group_ids = [aws_security_group.allow_ssh_2.id]
  key_name               = aws_key_pair.ssh_key.key_name
  availability_zone      = module.vpc.azs[1]
  subnet_id              = module.vpc.public_subnets[1]

  tags = merge(
    { Name = "rancher" },
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

resource "aws_eip" "rancher-eip" {
  instance = aws_instance.rancher.id
  vpc      = true

  depends_on = [
    aws_instance.rancher
  ]

  tags = merge(
    { Name = "eip-rancher" },
    local.tags
  )
}

resource "aws_lb_target_group" "rancher" {
  name = "rancher-tg"
  depends_on = [
    aws_instance.rancher
  ]
  port        = 80
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id
  target_type = "instance"

  tags = merge(
    { Name = "rancher TG" },
    local.tags
  )
}

resource "aws_lb_target_group_attachment" "rancher" {
  depends_on = [
    aws_lb_target_group.rancher
  ]

  target_group_arn = aws_lb_target_group.rancher.arn
  target_id        = aws_instance.rancher.id
  port             = 80
}
