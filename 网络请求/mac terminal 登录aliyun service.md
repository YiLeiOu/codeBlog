## 操作步骤

1. 登录ECS管理控制台。

2. 在左侧导航栏，单击网络与安全 > 密钥对。
     ![](img/pem.png)

3. 在顶部状态栏左上角处，选择地域。

4. 单击创建密钥对。

5. 设置密钥对名称，点击确定会创建密钥并自动下载。

    ![](img/pem1.png)

6. 打开Mac 的terminal窗口

    1.  `cd ~/.ssh` 进入到.ssh目录下
    2.  `mv ~/Documents/ssh/aipetpet.pem ./ `把密钥移动或复制到当前.ssh目录下
    3.  修改密钥文件的权限`chmod 400 aipetpet.pem`

7. 连接至实例

    `ssh -i ~/.ssh/mysshkey.pem root@10.10.xx.xxx`

8. 输入实例登录密码，登录成功

    进行到这一步就已经可以通过上面的操作顺利登录远程服务器了，有个不方便的操作就是每次都要输入服务器域名才能登录，要记住一串毫无规律的域名并非易事，这操作有点反人性。还好有更好的解决方案：给每个服务器配置一个别名，之后就可以通过输入别名登录服务器。

9.  配置使用别名连接服务器

    要记住域名并不容易，所以通过terminal来登录服务器的最好方法是给每个服务一个名称，然后就可以使用这个名称登录远程服务器。

    在~/.ssh/目录下打开config文件，首次配置一般没有这个文件，就要用vim编辑器新建config文件，然后按照格式设置以下命令:

    ```php
    # 服务器1
    Host myServer   // 输入ECS实例的名称
        HostName 192.*.*.*   // 实例的公网IP地址
        Port 22   // 端口号，默认为22
        User root   // 登录账号
        IdentityFile ~/.ssh/ecs.pem // 输入.pem私钥文件在本机的地址
    ```

    最后，config配置完成后就可以使用别名连接服务器了

    `ssh myServer`


**安装wordpress**

1. 已经安装好了lnmp
2. 域名解析
3. 安装wordpress
4. 修改wordpress数据表中wp_options字段把option_value修改成“wp-content/uploads”
5. 刷新wordpress
   
[参考](https://www.newlearner.site/2018/11/03/wordpress-lnmp.html)



