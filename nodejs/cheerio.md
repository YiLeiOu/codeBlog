1. 用html()方法保存的页面文本被编码

    ```js
    // 默认开启字符编码
    cheerio.load(data);
    // 手动把字符编码关闭
    cheerio.load(data,{ decodeEntities: false });
    ```

2. 使用find方法查找元素

    返回的是可遍历的对象，包含查找匹配的元素以及其他属性和方法。可以通过for...in遍历元素进行操作，注意的是要在操作前判断一下是否符合要求。一般是判断key是否为数字或可转换成数字类型。


    ```js
    // decodeEntities 字符编码配置项
    let $ = cheerio.load(data,{ decodeEntities: false });

    let imgs = $('.container').find('img');

    for(var i in imgs){

       let img = imgs[i];

       if( isNaN(i) && img.name !== 'img' ) continue;

       console.log('do something...');

    }
    ```