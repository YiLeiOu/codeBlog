## XMLHttpRequest

    使用XMLHttpRequest(XHR)对象可与服务器进行交互而无需刷新整个页面。也就是常说的异步请求，在Ajax的实现中被大量使用。

    XMLHttpRequest 可以用于获取任何类型的数据，而不仅仅是XML，它甚至支持 HTTP 以外的协议（包括 file:// 和 FTP）。

### 使用

    通过调用XMLhttprequest()构造函数初始化一个XMLhttprequest对象，然后通过该对象调用get、post等方法。

### xmlhttprequest 对象的属性



### xmlhttprequest 对象的方法



---------------------


### 问题

1. 获取重定向后的链接

    使用responseURL属性获取重定向后的链接。

    ```js
    xhr.onreadystatechange = function() {
  	    if( this.readyState == this.HEADERS_RECEIVED ) {
    	    consoleo.log(xhr.responseURL)// 重定向后的链接;
  	    }
    }
    ```

2. 在nodejs中使用XMLHttpRequest返回undefined

    XMLHttpRequest 是在浏览器环境使用的对象，在node环境中使用时需要安装XMLHttpRequest依赖，并像使用其他模块那样用require方法导入。

    `const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;`
    在使用过程中还是会受到同源控制策略的限制，即便请求数据成功也不能通过response接受到数据。

    在node环境中请求数据应该直接使用nodejs的http对象：

    ```js
    //引入https模块
    const https = require('https');

    https.get(curItem, (res) => {
        if( !!!res.headers.location ) return;
        let uri = (res.headers.location).replace('short','full');
        console.log('uri===========',uri);
    }).on('error', (e) => {
         console.error(e);
    });

    ```

