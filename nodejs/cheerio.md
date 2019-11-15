1. 用html()方法保存的页面文本被编码

    ```
    // 默认开启字符编码
    cheerio.load(data);
    // 手动把字符编码关闭
    cheerio.load(data,{ decodeEntities: false });
    ```