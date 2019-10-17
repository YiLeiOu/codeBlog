# iMobTrax 使用文档

**参考：**

[1. iMobiTrax 3.8安装激活](http://blog.zivers.com/post/1705.html)

[2. iMobiTrax最全使用文档](https://www.advertcn.com/thread-22939-1-1.html)

[VMware Workstation Pro v15.5.0 官方版+激活密钥](https://www.nocmd.com/740.html)

[CentOS 7.2 iso下载](https://man.linuxde.net/download/CentOS_7_2)

[VMware虚拟机安装CentOS 7并搭建lamp服务器环境](https://blog.csdn.net/chandoudeyuyi/article/details/52223600)

[LNMP v1.5 无人值守安装](https://lnmp.org/faq/v1-5-auto-install.html)

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
### 2. 安装IM及测试
## 3. IM主要设置说明；
## 4. 服务器运维
## 5. 常见故障排查及解决
## 6. 高级技巧