1. 定义组件
    ```js
    // 官方维护的 vue-class-component 修饰器，基于类的 API
    import Component from 'vue-class-component'
    // defined the component of CreateDialog.vue
    // @Component 修饰符注明了此类为一个 Vue 组件
    @Component({
       name: 'CreateDialog'
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

    

