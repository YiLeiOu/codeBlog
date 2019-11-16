1. 通过 include 或 require 语句，可以将 PHP 文件的内容插入另一个 PHP 文件（在服务器执行它之前）

    **include 和 require 语句是相同的，除了错误处理方面**：

    -  require 会生成致命错误（E_COMPILE_ERROR）并停止脚本
    -  include 只生成警告（E_WARNING），并且脚本会继续

2. php程序获取当前访问服务器的URL信息

    ```php
    //测试网址:     http://localhost/blog/testurl.php?id=5

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

   ```php
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

    - chmod：`sudo chmod 666 -R /home/wwwroot/default/log/echo.log` 修改目录或文件对所有用户开启读写权限
    - 修改php.ini

7. PHP 类型判断

    - gettype() 速度较慢，可能已经不兼容，不推荐使用

    - 推荐使用is_*()系列方法


8. 操作SQLite数据库
   
   - sqlite进入` ...> `状态退出的方法：此时是进入SQL数据语言模式，需要输入完整的SQL语句，即结尾要加`;`（分号）
   - 退出sqlite ：使用`.quit`语句退出


9. `<<<EOF string EOF;`定界符
    
   ```php
   $sql = <<<EOF  
        //sql语句
   EOF;
   ```
   属于php的定界符,在
   `<<<EOF 和 EOF;` 之间的文本, 将**不会被转义**, 比如单引号和双引号以及中括号（$json['ID']这种数组变量会导致程序出错）。一般用于输出长的html文本或者文本赋值。这样写sql语句, 可以不用对字符型字段两边的单引号进行转义。

   **有特殊符号的变量字符：**

   ```php
   //先把数组元素赋值给变量
   $IP = $json['query'];
   $name = $json['city'];

   $sql =<<<EOF
        INSERT INTO IPTEST (IP,name) VALUES ('$IP','$name'); // 把变量插入定界符中
   EOF;//结束符前不可有空格，需顶行

   ```

10. 判断数据表是否已经存在。[参考](https://www.hangge.com/blog/cache/detail_1453.html)

    - 只要判断结果：`SELECT count(*) FROM sqlite_master WHERE type="table" AND name = `"**tableName**";

      ```php
      # judge table whether existed
          $sql = <<<EOF
              SELECT count(*) FROM sqlite_master WHERE type="table" AND name = "COMPANY";
      EOF;
      ```
      **注意:** 实际使用似乎不起作用，$res的值总是为1。

    - 创建表的时候判断：`CREATE TABLE IF NOT EXISTS `**tableName**

      ```php
        $sql =<<<EOF
            CREATE TABLE IF NOT EXISTS COMPANY(
            query INT PRIMARY KEY     NOT NULL,
            status           TEXT    NOT NULL
        );
      EOF;
      ```


11. sqlite3(mysql类似)自增key设定(创建自增字段)

    - 使用命令`INTEGER PRIMARY KEY AUTOINCREMENT`即可设置表数据插入时id索引自增。在插入数据时直接置空

      ```php
      create table test (
          [tkid]            integer PRIMARY KEY autoincrement,               # -- 设置自增主键
          [tktype]          int default 0,
          [tableid]         varchar (50),
          [createdate]      datetime default (datetime('now', 'localtime'))  # -- 时间
      );
      ```



12. 获取当前文件的绝对路径

    多个文件之间相互调用时容易出现找不到准确路径的问题，使用`dirname(__FILE__)`函数返回当前脚本所在目录的绝对路径，可以很好地解决这个问题。

    - dirname(__FILE__) 返回当前执行脚本所在的路径

    ```php
    <?php 
      echo __FILE__ ; // 返回当前执行脚本绝对路径，输出：D:\www\test.php 
      echo dirname(__FILE__); // 返回当前脚本所在的绝对目录，输出：D:\www\ 
      echo dirname(dirname(__FILE__)); //支持嵌套调用，返回上一层绝对目录，输出：D:\ 
    ?>
    ```

13. php 批量插入sql数据

    - 第一种操作：

    ```php
    <?php # 此代码不能直接用

        $servername = 'localhost';
        $username = 'root';
        $passw = '000000';
        $db = 'mydb';

        $count = 10;

        $con = new mysqli($servername,$username,$passw,$db);

        if( $con->connect_error){

            die('connect fail:'.$con->connect_error.PHP_EOL);

        }

        while( $count-- ){

            # 遍历执行插入
        
            # key
            $sql = "insert into wp_posts (
                ID,
                post_author,
                post_date,
                post_date_gmt,
                post_content,
                post_title,
                post_excerpt,
                post_name,
                post_modified,
                post_modified_gmt,
                guid) VALUES";
            
            # value
            $sql .="
            (
                '$id',
                1,
                '$date',
                '$date',
                '$content',
                '$title',
                '$excerpt',
                '$title',
                '$date',
                '$date',
                '$guid'
            );";

            $con->multi_query($sql);

        }

    }

    ```

    - 第二种操作

    ```php
    <?php # 此代码不能直接用

        $servername = 'localhost';
        $username = 'root';
        $passw = '000000';
        $db = 'mydb';

        $count = 10;

        $con = new mysqli($servername,$username,$passw,$db);

        if( $con->connect_error){

            die('connect fail:'.$con->connect_error.PHP_EOL);

        }
        # key
        $sql = "insert into wp_posts (
            ID,
            post_author,
            post_date,
            post_date_gmt,
            post_content,
            post_title,
            post_excerpt,
            post_name,
            post_modified,
            post_modified_gmt,
            guid) VALUES";

        while( $count-- ){

            # 遍历执行拼接value，最后一次性插入

            # value
            $sql .="
            (
                '$id',
                1,
                '$date',
                '$date',
                '$content',
                '$title',
                '$excerpt',
                '$title',
                '$date',
                '$date',
                '$guid'
            ),";# <======  注意这里的区别

        }
        $sql = rtrim($sql, ','); # 删除字符串末端空白字符

        if( $con->multi_query($sql) === TRUE ){

            echo 'insert data successfully'.PHP_EOL;

        }else{

           echo 'create table fail:'.$con->error;

        }        

    }
    ```