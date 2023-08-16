variable "number_computer" {
  type    = number
  default = 1
}

variable "private_key_path" {
  type = string
  default = "~/.ssh/id_rsa"
}

variable "region" {
  type = string
  default = "ap-southeast-1"
}
