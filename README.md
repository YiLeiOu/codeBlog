请按照以下说明在类似Unix的系统上下载，编译和安装TunSafe。

1.下载TunSafe源代码
$ git clone https://github.com/TunSafe/TunSafe.git
$ cd TunSafe

2.安装编译器环境
的Linux
$ sudo apt-get install clang-6.0 
FreeBSD
$ sudo pkg安装gcc7

3.构建并安装TunSafe
$使
$ sudo make install
如果一切顺利，那么您现在tunsafe在/ usr / bin目录中有一个工具。

4.运行TunSafe
要使用TunSafe，您需要来自VPN提供商的WireGuard配置文件。您也可以使用免费的TunSafe VPN服务器。假设它名为TunSafe.conf，请执行以下操作以启动TunSafe：

$ sudo tunsafe start -d TunSafe.conf
如果一切顺利，TunSafe守护进程将继续在后台运行。要改为在前台运行，请省略该-d标志。

您可以使用该tunsafe show命令验证TunSafe是否正在运行。它看起来应该与此相似。


-----------

Follow the instructions below to download, compile and install TunSafe on unix-like systems.

1. Download the TunSafe source code
$ git clone https://github.com/TunSafe/TunSafe.git
$ cd TunSafe

2. Install compiler environment
Linux
$ sudo apt-get install clang-6.0 
FreeBSD
$ sudo pkg install gcc7

3. Build and install TunSafe
$ make
$ sudo make install
If everything went well, you now have a tunsafe tool in the /usr/bin directory.

4. Run TunSafe
To use TunSafe you need a WireGuard configuration file from a VPN provider. You can also use the free TunSafe VPN servers. Assuming it's named TunSafe.conf, do the following to start TunSafe:

$ sudo tunsafe start -d TunSafe.conf
If everything went well, TunSafe daemonizes and continues running in the background. To instead run in the foreground, omit the -d flag.

You can verify that TunSafe is running with the tunsafe show command. It should look similar to this.

