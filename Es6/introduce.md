# Es6 简介

## 1. ECMAScript和JavaScript的关系

- ES是JS的规格或者说语言规范；JS是ES标准的其中一种实现。也就是说，使用ES标准实现的语言除了JS之外还有其他种类的编程语言。例如JScript以及ActionScript

## 2. babel 转码

- 顾名思义，转码就是把当前的代码转换成另一种代码。在这里就是将ES6语法标准的代码转换成ES5语法标准的代码，目的是为了兼容不同的浏览器运行环境，因为有的浏览器对ES6语法的代码并不支持。所以需要转换成老旧浏览器兼容的ES5语法代码。

- 在项目中使用：

    1. 安装 `@babel/core` 依赖

    ```
    npm install --save-dev @babel/core

    // 最新转码规则
    npm install --save-dev @babel/preset-env

    // react 转码规则
    npm install --save-dev @babel/preset-react

    ```

    2. 配置 `.babelrc`

    ```
    {
       "presets": [
         "@babel/env",
         "@babel/preset-react"
       ],
       "plugins": []
    }

    ```

- Babel只对ES6语句语法转码，不转换新的API。所以使用`@babel/polyfill`对ES6的API进行转码

    ```
    // 安装
    npm install --save-dev @babel/polyfill
    // 引用
    import '@babel/polyfill';
    // 或
    require('@babel/polyfill');
    ```


## 3. let 和 const 命令

### let命令

let命令用来声明变量，基本功能与var命令几乎一样。不同的地方是let支持块级作用域，以及比var新增了许多在编程习惯中更合理规范的特性。

- 不存在变量提升的问题

    变量提升的简单定义就是：变量的调用可以在声明前发生，而程序也不会报错，变量的值只会是undefined。
    ```
    console.log(foo); // 输出undefined
    var foo = 2;
    ```
    let命令则改变了这一习惯，变量必须在调用前声明，否则程序就会报错
    ```
    console.log(bar); // 报错ReferenceError
    let bar = 2;
    ```

- 暂时性死区

    暂时性死区可以这样理解：只要块级作用域内声明了一个let变量，同时块级外部也有一个同名的变量的情况下，块级内部变量不会受到外部变量的影响。
    
    简而言之就是块级内部只会查找并引用块级内定义的那个变量，而不会到块级外部去调用，即便块级内对变量的调用先于let命令变量的声明。

    ```
    var tmp = 123;

    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }

    ```

- 不能重复声明

    同一块级作用域下同一变量名不能重复声明，否则程序就会报错。

    这样会报错：

    ```
    let counter = ()=>{
        var total = 0;
        let total = 100; // ReferenceError
    }

    ```

    这样不会报错：
    ```
    var tmp = 123;

    if (true) {
      let tmp = 456;
      console.log(tmp); // 456
    }

    ```


### 块级作用域

上面的说明中多次提到了”块级作用域“，那么什么是块级作用域呢？有什么用？为什么需要这么一个作用域？

JavaScript以往的版本，也即ES6以前的版本只有全局和函数这两种作用域，而没有块级作用域这个概念。跨级作用域的缺失使得JavaScript这种编程语言欠缺了该有的严谨性和规范性，此外也造成许多编程人员的一些不合理编程习惯。

ES6引入块级作用域实在是一个巨大的进步。

- 什么是块级作用域

    以`{}`作为边界的代码块就属于一个块级作用域。代码块内部可以访问父级的变量；同级的代码块内部同名变量不受影响、不被干扰。

    

