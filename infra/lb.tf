resource "aws_lb_target_group" "main" {
  name = "${var.project}-tg"
  depends_on = [
    aws_instance.app-server
  ]
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "instance"

  tags = merge(
    { Name = "${var.project} TG" },
    local.tags
  )
}

resource "aws_lb_target_group_attachment" "app-public" {
  count = var.number_computer
  depends_on = [
    aws_lb_target_group.main
  ]

  target_group_arn = aws_lb_target_group.main.arn
  target_id        = aws_instance.app-server[count.index].id
  port             = 80
}

resource "aws_lb" "main" {
  depends_on = [
    aws_lb_target_group.main
  ]

  name               = "${var.project}-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_ssh.id]
  subnets            = aws_subnet.public_subnets[*].id

  tags = merge(
    { Name = "${var.project} LB" },
    local.tags
  )
}

resource "aws_lb_listener" "http" {
  depends_on = [
    aws_lb.main
  ]

  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
}
