1. 通过 include 或 require 语句，可以将 PHP 文件的内容插入另一个 PHP 文件（在服务器执行它之前）

    **include 和 require 语句是相同的，除了错误处理方面**：

    -  require 会生成致命错误（E_COMPILE_ERROR）并停止脚本
    -  include 只生成警告（E_WARNING），并且脚本会继续

2. php程序获取当前访问服务器的URL信息

    ```
    测试网址:     http://localhost/blog/testurl.php?id=5

   //获取域名或主机地址 
   echo $_SERVER['HTTP_HOST']."<br>"; #localhost

   //获取网页地址 
   echo $_SERVER['PHP_SELF']."<br>"; #/blog/testurl.php

   //获取网址参数 
   echo $_SERVER["QUERY_STRING"]."<br>"; #id=5

   //获取用户代理 
   echo $_SERVER['HTTP_REFERER']."<br>"; 

   //获取完整的url
   echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
   echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
   #http://localhost/blog/testurl.php?id=5

   //包含端口号的完整url
   echo 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"]; 
   #http://localhost:80/blog/testurl.php?id=5

   //只取路径
   $url='http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"]; 
   echo dirname($url);
   #http://localhost/blog

    ```

3. PHP参数分割提取

   ```
   //解析URL参数
   function parseUrlParam($query){
       $queryArr = explode('&', $query);
       $params = array();
       if($queryArr[0] !== ''){
           foreach( $queryArr as $param ){
               list($name, $value) = explode('=', $param);
               $params[urldecode($name)] = urldecode($value);
           }       
       }
       return $params;
   }

   //设置URL参数数组
   function setUrlParams($cparams, $url = ''){
     $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
     $query = isset($parse_url['query']) ? $parse_url['query'] : '';
     $params = parseUrlParam($query);
     foreach( $cparams as $key => $value ){
       $params[$key] = $value;
     }
     return $parse_url['path'].'?'.http_build_query($params);
   }

   //获取URL参数
   function getUrlParam($cparam, $url = ''){
       $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
       $query = isset($parse_url['query']) ? $parse_url['query'] : '';
       $params = parseUrlParam($query);
       return isset($params[$cparam]) ? $params[$cparam] : '';
   }
   ```

3. 文件读写之[`fopen(filePath,pattern)`](https://www.runoob.com/php/func-filesystem-fopen.html)函数。[更多解读](https://www.runoob.com/php/php-ref-filesystem.html)

    `fopen(filePath,pattern)`用于在PHP程序中打开文件,第一个参数filePath表示文件路径及名称，第二个参数表示使用哪种模式打开当前文件。

    **文件打开模式：**

    | 模式 | 描述 |
    |:------:|:------|
    |r     |只读，对应read。从文件开头开始|
    |r+     |读/写。在文件的开头开始    |
    | w    |只写，对应write。打开并清空文件的内容；如果文件不存在，则创建新文件。     |
    |  w+   |读/写。打开并清空文件的内容；如果文件不存在，则创建新文件。     |
    |   a  | 追加，对应addition。打开并向文件末尾进行写操作，如果文件不存在，则创建新文件。    |
    |   a+  |读/追加。通过向文件末尾写内容，来保持文件内容。     |
    |   x  | 只写。创建新文件。如果文件已存在，则返回 FALSE 和一个错误。    |
    |   x+  | 读/写。创建新文件。如果文件已存在，则返回 FALSE 和一个错误。     |

    **注释：** 如果 `fopen()` 函数无法打开指定文件，则返回 0 (false)。

    **其他配合使用的常用方法：**

    - [`fclose($file)`](https://www.runoob.com/php/func-filesystem-fclose.html) 关闭当前打开的文件
    - [`fgets($file)`](https://www.runoob.com/php/func-filesystem-fgets.html) 从打开的文件中返回一行，如果失败该函数返回 FALSE
    - [`fgetc($file)`](https://www.runoob.com/php/func-filesystem-fgetc.html) 逐字符读取文件内容
    - [`feof($file)`](https://www.runoob.com/php/func-filesystem-feof.html) 检测是否已经到文件内容结尾
    - [`fwrite(file,string,?length)`](https://www.runoob.com/php/func-filesystem-fwrite.html) 将内容写入一个打开的文件中。成功执行，则返回写入的字节数；如果失败，则返回 FALSE
    - [`fputs()($file)`](https://www.runoob.com/php/func-filesystem-fputs.html) fwrite() 的别名

    ```php
    <?php
        $file = fopen("welcome.txt", "r") 
            or 
            exit("无法打开文件!");
        // 读取文件每一行，直到文件结尾
        while(!feof($file))
        {
            echo fgets($file). "<br>";
        }
        fclose($file);
    ?>
    ```

5. PHP 换行符： PHP_EOL

   ```php
   <?php
      echo PHP_EOL;
      //windows平台相当于    echo "\r\n";
      //unix\linux平台相当于    echo "\n";
      //mac平台相当于    echo "\r";
   ?>
   ```

6. 使用fopen()函数时遇到的问题

    在php程序中使用fopen()函数写入访客的IP信息，在命令行下可以顺利新建或打开文件，而通过浏览器请求php后缀的文件时，fopen()函数就失效了。其实对比到这样的情况就可以大概确定这是服务器权限导致的问题。解决方案也很明确，就是修改根目录的权限。

    - chmod：`sudo chmod 777 -R /home/wwwroot` 把/home/wwwroot目录对所有用户开启读写权限
    - 修改php.ini

7. PHP 类型判断

    - gettype() 速度较慢，可能已经不兼容，不推荐使用

    - 推荐使用is_*()系列方法

