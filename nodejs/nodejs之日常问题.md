1. nodejs 清空文件内容

    ```js
    const fs = require('fs');
    fs.truncate('test.txt',0,()=>{
        console.log('clear done!');
    })

    // or 

    fs.writeFile('test.txt','',()=>{
        console.log('clear done!');
    })
    ```

2. 获取当前执行脚本的绝对路径

    ```js
   __dirname：    获得当前执行文件所在目录的完整目录名
   __filename：   获得当前执行文件的带有完整绝对路径的文件名
   process.cwd()：获得当前执行node命令时候的文件夹目录名 
   ./： 不使用require时候，./与process.cwd()一样，使用require时候，与__dirname一样
    ```


3. nodejs环境下网页捉取脚本分析：cheerio

    提供jQuery的方式操作DOM结构，并支持selector、attribute、class等语句操作DOM元素，获取元素内的内容等。

    **用法：**
    ```js
   const cheerio = require('cheerio')
   const $ = cheerio.load('<h2 class="title">Hello world</h2>')

   $('h2.title').text('Hello there!')
   $('h2').addClass('welcome')

   $.html()
   //=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>
    ```


4. nodejs发起http请求的解决方案

    在使用一下库开发下载文件的代码时，http和request都会经常报错:
    ```js
    1. Error: socket hang up at
    2. Error: ECONNRESET
    3. Unhandled stream error in pipe.
    ```
    最后还是用Axios比较顺手


    - Http标准库


    - Request库


    - Axios库，基于Promise


    - superAgent


    - Got

