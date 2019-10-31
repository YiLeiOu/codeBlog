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

