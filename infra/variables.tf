variable "number_computer" {
  type    = number
  default = 1
}

variable "private_key_path" {
  type    = string
  default = "~/.ssh/deployer"
}

variable "region" {
  type    = string
  default = "ap-southeast-1"
}

variable "project" {
  description = "The project namespace to use for unique resource naming"
  default     = "faucet"
  type        = string
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "Public Subnet CIDR values"
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "Private Subnet CIDR values"
  default     = ["10.0.128.0/24", "10.0.129.0/24", "10.0.130.0/24"]
}

variable "azs" {
  type        = list(string)
  description = "Availability Zones"
  default     = ["ap-southeast-1a", "ap-southeast-1b", "ap-southeast-1c"]
}
