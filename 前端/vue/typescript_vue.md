1. 定义组件
    ```js
    // 官方维护的 vue-class-component 修饰器，基于类的 API
    import Component from 'vue-class-component'
    // defined the component of CreateDialog.vue
    // @Component 修饰符注明了此类为一个 Vue 组件
    @Component({
       name: 'CreateDialog',
       // 引用外部子组件需要在components对象中注册
       components:{
           component1, component2, ...
       }
    })
    ```

2. 语言切换插件
   ```js
   import i18n from './plugins/i18n'

   // init the plugin
   pluginOptions: {
       i18n: {
         locale: 'zh',
         fallbackLocale: 'zh',
         localeDir: 'locales',
         enableInSFC: true
       }
   }
   ```

3. 使用插槽slot

- 浅层理解：在组件中声明某个元素位置作为插槽，在调用组件时插槽位置就可以自定义元素或内容，有利于提高组件的可复用性。

    使用插槽需要以特定的规则声明以及调用。

4. 接口interface

- 浅层理解：规定数据的结构和类型，将变量的类型定义为某个接口的类型后，给该变量赋值必须符合接口定义的数据结构和类型规范。

    举个例子：

    螺丝刀与螺丝的卡口就需要按照某种模式进行匹配才可用。一字螺丝刀对应一字卡槽的螺丝；十字螺丝刀对应十字卡槽的螺丝。


5. this.$emit(fun,value) 

    此方法用于触发父组件的事件。除此之外还可以使用$parent以及props属性实现同样功能。

    但是this.$emit(fun,value) 可以实现触发父组件的方法并传递参数给父组件。

6. 获取对象属性报错

    ```js
    // error
    this.$refs.customSlider.form.resetValidation()
    // Property 'resetValidation' does not exist on type 'Vue

    // solution
    // 把resetValidation方法作为Vue的属性定义并声明类型
    public resetValidation () {
      // 把this.$refs.form指定为Vue类，并且定义resetValidation属性
      return (this.$refs.form as Vue & { resetValidation: () => void }).resetValidation()
    }

    @Watch('resetAswer')
    onResetAnswer () {
      this.resetValidation()
      this.topicAnswer = ''
    }

    ```

    ```js

    // error
    this.$refs.customSlider.$el.parentNode.style.cssText += 'padding: 0 55px;'
    //Property '$el' does not exist on type 'Vue | Element | Vue[] | Element[]'.
    //   Property '$el' does not exist on type 'Element'.Vetur(2339)

    ```

    ```js

    uploadHandler () {
        document.querySelector('.upload-input-wraper .v-file-input__text').click()
    }
    //error1: Object is possibly 'null'.
    //error2: Property 'click' does not exist on type 'Element'.
    
    
    // 给对象指定类型
    // 'Element'和 'HTMLElement'对象所拥有的属性不同，HTMLElement对象继承自Element
    // solution 1
    public click () {
       return (document.querySelector('.upload-input-wraper .v-file-input__text') as HTMLElement).click()
    }
    uploadHandler () {
       this.click()
    }

    // solution 2
    uploadHandler () {
       (document.querySelector('.upload-input-wraper .v-file-input__text') as HTMLElement).click()
    }

    ```

