# iMobTrax 从0到1

**问题：**
1. IM 是否支持多个账号同时追踪？可以的话最多支持多少个？
2. IM跳转是什么意思

**参考：**

[1. iMobiTrax 3.8安装激活](http://blog.zivers.com/post/1705.html)

[2. iMobiTrax最全使用文档](https://www.advertcn.com/thread-22939-1-1.html)

**环境安装：**



[VMware Workstation Pro v15.5.0 官方版+激活密钥](https://www.nocmd.com/740.html)

**下载地址：**

[Workstation 15 Pro for Windows](https://www.vmware.com/go/getworkstation-win)

[Workstation 15 Pro for Linux](https://www.vmware.com/go/getworkstation-linux)

**激活密钥：**
```
ZC10K-8EF57-084QZ-VXYXE-ZF2XF

UF71K-2TW5J-M88QZ-8WMNT-WKUY4

AZ7MK-44Y1J-H819Z-WMYNC-N7ATF

CU702-DRD1M-H89GP-JFW5E-YL8X6

YY5EA-00XDJ-480RP-35QQV-XY8F6

VA510-23F57-M85PY-7FN7C-MCRG0
```

[CentOS 7.2 iso下载](https://man.linuxde.net/download/CentOS_7_2)

**DVD版:**[下载](http://archive.kernel.org/centos-vault/7.2.1511/isos/x86_64/CentOS-7-x86_64-DVD-1511.iso)

[VMware虚拟机安装CentOS 7并搭建lamp服务器环境教程](https://blog.csdn.net/chandoudeyuyi/article/details/52223600)

[LNMP v1.5 无人值守安装教程](https://lnmp.org/faq/v1-5-auto-install.html)

**无人值守安装命令：**
```
wget http://soft.vpser.net/lnmp/lnmp1.5.tar.gz -cO lnmp1.5.tar.gz && tar zxf lnmp1.5.tar.gz && cd lnmp1.5 && LNMP_Auto="y" DBSelect="2" DB_Root_Password="lnmp.org" InstallInnodb="y" PHPSelect="5" SelectMalloc="1" ./install.sh lnmp
```


## 环境安装步骤

### 1. 安装CentOS 7 

- 正式生产服务器建议安装英文版本
- 设置磁盘分区
  1. swap  交换分区 2048M
  2. /data 分区
  3. /     剩余所有空间
- 默认最小安装，即不安装桌面环境（开机即为命令行模式）
- 用户设置-ROOT密码
- 重启
- 进入登录界面
- 更改配置文件来开启网络
  1. cd /etc/sysconfig/network-scripts 按enter
  2. ls 按enter
  3. vi ifcfg-eno16777736 按下enter
  4. i 键 进入编辑模式，将no 改成yes 然后按ESC键，再输入 ：wq （wq表示保存并退出）
  5. 重启网卡： service network start
  6. ping命令测试连通性 ，例如 ping -c 10 202.108.22.5(ping 百度首页的网址,ping次数为10次,可通过Ctrl+C终止命令)
- yum install screen 或 apt-get install screen
- screen -S lnmp




## 1. 服务器搭建与生产环境配置；
### 1. 服务器选择
### 2. 环境配置
### 3. 生产环境优化
## 2. IM安装与基础数据设置；
### 1. 上传API文件

#### 上传API文件

假设你的IM服务器IP为：8.8.4.4，操作系统为centos,环境为lnmp.org

1. 在8.8.4.4服务器默认目录中（如lnmp.org环境，默认目录为/home/wwwroot/default/），新建一个名为~imobi文件夹，在~imobi文件夹下新建一个名为license的文件夹，复制文件（api.php，文件在附件中）到license目录下；
 
   ```
   // api.php 文件内容
   <?php
   echo '{"info1":"%07%B5-%3C%D7%F5%87%A7","info2":"%07%B5-%3C%D7%F5%87%A7","iVersion":"3.7","iDate":"1411404810","dVersion":"1.4","dDate":"1352822617","info":"rc%A1%9F%3C%A7%F4%EC%F0%27%EB%B3%3A%83%F2%11"}';
   ?>

   ``` 
2. 在浏览器中访问本文件对应的URL网址，确认是否可以访问，如http://8.8.4.4/~imobi/license/api.php （注：把8.8.4.4替换为你服务器的真实IP）；
   
3. 检查IP forward是否开启:
  运行 cat/proc/sys/net/ipv4/ip_forward
  如果返回结果为1，表示IP forward已开启；返回结果为0，表示IP forward没开启；


4. 如果 IP forward没开启，修改/etc/sysctl.conf
  将其中 “net.ipv4.ip_forward= 0” 修改为 “net.ipv4.ip_forward= 1”
  如果没有上述这行，在/etc/sysctl.conf文件中增加这行
  运行 sysctl -p  使修改生效

5. 增加包转发策略
  运行 iptables -t nat -AOUTPUT -d 50.28.102.240 -j DNAT --to 8.8.4.4 (注：把8.8.4.4替换为你服务器的真实IP）

6. 检查转发策略是否启用
  iptables -L -t nat
  如果在Chain OUTPUT(policy ACCEPT)中有如下条目
  DNAT      all  --  anywhere             50.28.102.240        to:8.8.4.4 （注：8.8.4.4应为你服务器的真实IP）
  说明转发策略正常

7. 下面就可以拿官方安装包在服务器上正常安装，并且所有指向IM服务器的验证数据都会被转发到你的服务器上验证。


8. 这个方法的优点：不修改官方安装包中任何文件，仅在服务器上设置转发授权验证数据。

以上操作在LinodeVPS,CentOS 7,lnmp.org一键包安装环境中测试正常。
本文件可以与IM使用同一服务器。


1. **注意：**
   
   1. 当服务器重启后，可能需要重新增加包转发策略（也就是e骤），原因是部分系统重启后防火墙策略会被删除。或你可以保存一下防火墙策略，系统不同，命令不同，请自行GOOGLE。

   2. 部分环境的default目录（也就是浏览器访问IP地址所对应的目录）很难找，请查阅对应环境的官网FAQ。

### 2. 安装IM及测试

#### 问题

[ioncube loader 插件没有](https://51daiwei.net/install-ioncube-loader-on-centos)


## 3. IM主要设置说明；
## 4. 服务器运维
## 5. 常见故障排查及解决
## 6. 高级技巧