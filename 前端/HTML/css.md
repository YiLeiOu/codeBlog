1. 元素或元素后代获得焦点focus的选择器。(:focus选择器只会作用于input元素)

    ```css
   /* 匹配<div>，当它的某个后代获得焦点 */
   div:focus-within {
     background: cyan;
   }
    ```

2. 类似于vue的组件化开发项目中，切换页面后出现布局或样式问题的bug大概率是不同组件的渲染导致样式被覆盖。最直接找到问题根源所在的办法就是在浏览器控制台进行调试，而且布局问题一般是display、position、float等布局属性所导致。 

3. 使用aria-label给非img Html Element添加标签说明，aria-label属性用来给当前元素加上的标签描述，接受字符串作为参数，可以用在任何典型的HTML元素中。除了aria-label属性之外还可以用title属性，但是title属性不能自定义样式

    ```html
    <!-- 关键属性是：aria-label -->
    <v-btn class="btn" aria-label="Copy" text icon>
       <font-icon class="iconStyle" type="copy-plus"/>
    </v-btn>
    ```
    
    ```css
    .btn {
       position: relative;
       height: 20px;
       margin-right: 13px;
       padding-right: 10px;
    }
    .btn[aria-label]:after {
       opacity:0;
       content: attr(aria-label);
       padding: 4px 8px;
       position: absolute;
       font-size: 12px;
       left: -20%;
       top: -120%;
       white-space: nowrap;
       z-index: 20;
       background:rgba(0, 0, 0, 0.45);
       transition: opacity 0.5s;
       pointer-events:none;
       border-radius: 4px;
    }

    .btn[aria-label]:hover:after {
       opacity:1;
       transition-delay:0.2s;
    }

    ```