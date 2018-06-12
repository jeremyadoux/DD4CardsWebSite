VAGRANTFILE_API_VERSION = "2"

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.define "ddcards"

  config.vm.network "private_network", ip: "192.168.100.106"
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  config.vm.provider :virtualbox do |vb|
      vb.name = "ddcards"
	  vb.memory = 2048
	  vb.cpus = 2
  end

  config.vm.provision "shell", path: "scriptDocker.sh"
end
