## 使用npm i 命令安装依赖时报错

**背景：** 从一个已有项目中复制package.json、package-lock.json、webpack.config.js等文件到一个新的项目目录下执行`npm i`命令安装依赖。安装依赖失败且提示错误：

    ```
    npm ERR! Error: EPERM: operation not permitted, rename 'E:\work\ao-spider\nodeSpider\node_modules\minimalistic-crypto-utils\package.json.2330889671' -> 'E:\work\ao-spider\nodeSpider\node_modules\minimalistic-crypto-utils\package.json'
    npm ERR!  { [Error: EPERM: operation not permitted, rename 'E:\work\ao-spider\nodeSpider\node_modules\minimalistic-crypto-utils\package.json.2330889671' -> 'E:\work\ao-spider\nodeSpider\node_modules\minimalistic-crypto-utils\package.json']
    npm ERR!   cause:
    npm ERR!    { Error: EPERM: operation not permitted, rename 'E:\work\ao-spider\nodeSpider\node_modules\minimalistic-crypto-utils\package.json.2330889671' -> 'E:\work\ao-spider\nodeSpider\node_modules\minimalistic-crypto-utils\package.json'
    npm ERR!      errno: -4048,
    npm ERR!      code: 'EPERM',
    npm ERR!      syscall: 'rename',
    npm ERR!      path:
    npm ERR!       'E:\\work\\ao-spider\\nodeSpider\\node_modules\\minimalistic-crypto-utils\\package.json.2330889671',
    npm ERR!      dest:
    npm ERR!       'E:\\work\\ao-spider\\nodeSpider\\node_modules\\minimalistic-crypto-utils\\package.json' },
    npm ERR!   stack:
    npm ERR!    'Error: EPERM: operation not permitted, rename \'E:\\work\\ao-spider\\nodeSpider\\node_modules\\minimalistic-crypto-utils\\package.json.2330889671\' -> \'E:\\work\\ao-spider\\nodeSpider\\node_modules\\minimalistic-crypto-utils\\package.json\'',
    npm ERR!
    npm ERR! If you believe this might be a permissions issue, please double-check the        
    npm ERR! permissions of the file and its containing directories, or try running
    npm ERR! the command again as root/Administrator (though this is not recommended).        
    ```
    意思大概是操作被系统拒绝，没有权限修改该目录下的文件。

**解决方法：**

    ```
    1. rm -r .\node_modules\
    2. rm .\package-lock.json
    3. npm cache clear --force
        npm WARN using --force I sure hope you know what you are doing.
    4. npm i

    ``` 