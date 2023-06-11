variable "ssh_username" {
  type    = string
  default = "packer"
  sensitive = true
}

variable "ssh_password" {
  type    = string
  default = "packer"
  sensitive = true
}

variable "server_jwt_secret" {
  type    = string
  default = "very-secret-key"
  sensitive = true
}

source "vmware-iso" "debian" {
  vm_name          = "debian-10.11.0-amd64"
  boot_command     = ["<esc><wait>auto preseed/url=http://{{ .HTTPIP }}:{{ .HTTPPort }}/preseed.cfg<enter>"]
  boot_wait        = "5s"
  disk_size        = "40960"
  disk_type_id     = "0"
  guest_os_type    = "debian10-64"
  headless         = false
  http_directory   = "http"
  iso_checksum     = "133430141272d8bf96cfb10b6bfd1c945f5a59ea0efc2bcb56d1033c7f2866ea"
  iso_url          = "https://cdimage.debian.org/mirror/cdimage/archive/10.11.0/amd64/iso-cd/debian-10.11.0-amd64-netinst.iso"
  shutdown_command = "echo 'packer'|sudo -S shutdown -P now"
  ssh_username     = "${var.ssh_username}"
  ssh_password     = "${var.ssh_password}"
  ssh_port         = 22
  ssh_timeout      = "30m"
  vmx_data = {
    memsize             = "4096"
    numvcpus            = "1"
    "virtualHW.version" = "14"
  }
}

build {
  sources = ["source.vmware-iso.debian"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update && sudo apt-get upgrade",
      "sudo apt-get install curl net-tools apt-transport-https ca-certificates curl gnupg2 software-properties-common -y",
      "sudo curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -",
      "sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable\" -y",
      "sudo apt-get update -y",
      "sudo apt-get install docker-ce docker-compose -y",
      "sudo curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "sudo apt-get install pass -y",
      "sudo apt-get remove gnome-keyring -y",
      "sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -",
      "sudo apt-get install nodejs -y"
    ]
  }

  provisioner "file" {
    destination = "."
    source      = "../calendraft"
  }

  provisioner "shell" {
    inline = [
      "cd calendraft",
      "sudo docker-compose up -d",
      "sudo npm i -y",
    ]
  }

  provisioner "shell" {
    inline = [
      "cd calendraft/server",
      "touch .env",
      "echo 'DATABASE_URL=postgresql://calendraft_admin:calendraft_admin@localhost:5432/calendraft?schema=public' > .env",
      "echo 'JWT_SECRET=${var.server_jwt_secret}' >> .env",
      "npm run db:migrate -y"
    ]
  }

  provisioner "shell" {
    inline = [
      "cd calendraft/client/src/environments",
      "echo \"export const environment = { production: false, apiUrl: 'http://$(sudo ifconfig | grep -oP '(?<=inet\\s)\\d+(\\.\\d+){3}' | awk 'NR==3'):3000' };\" > environment.ts"
    ]
  }
}
