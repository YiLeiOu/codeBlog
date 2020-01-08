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

- 浅层理解：在组件中声明某个元素位置作为插槽，在调用组件时插槽位置就可以自定义元素或内容，有利于提高组件的可复用性以及扩展组件。

    使用插槽需要以特定的规则声明以及调用。

4. 接口interface

- 浅层理解：规定数据的结构和类型，将变量的类型定义为某个接口的类型后，给该变量赋值必须符合接口定义的数据结构和类型规范。

    举个例子：

    螺丝刀与螺丝的卡口就需要按照某种模式进行匹配才可用。一字螺丝刀对应一字卡槽的螺丝；十字螺丝刀对应十字卡槽的螺丝。


5. this.$emit(fun,value) 

    - 此方法用于子组件触发父组件的事件。除此之外还可以使用$parent以及props属性实现同样功能。

    - this.$emit(fun,value) 可以实现触发父组件的方法并传递参数给父组件。

    *子组件selectTopic.vue*
    ```html
    <!-- 在vue组件中绑定actionSelectd方法并传参 -->
    <v-select 
        @change="actionSelectd($event,topicData.id)"
    ></v-select>
    ```
    ```js
    export default class extends Vue {

        topicAnswer = ''
        // 定义actionSelectd方法
        actionSelectd (e:any, val:any) {
            this.topicAnswer = e
            if (this.topicAnswer) {
                // 派发selectchange监听器
                this.$emit('selectchange', { id: val, val: true })
            } else {
                this.$emit('selectchange', { id: val, val: false })
            }
        }
    }
    ```

    *父组件*
    ```html
    <!-- 把父组件的setAnswers方法绑定到子组件派发过来的selectchange监听器 -->
    <select-topic v-if="topicData.type == 'select'"
        @selectchange="setAnswers"
        :index="index+1">
    </select-topic>
    ```

    ```js
    import selectTopic from '@/views/ec/solutionList/components/selectTopic.vue'
    
    interface dynamicObject {
       [key: string]: any
    }
    export default class extends Vue{

        answerList: dynamicObject = {}

        setAnswers (val: any) {
            if (this.answerList) {
              for (const i in this.answerList) {
                if (i === val.id) {
                  this.answerList[val.id] = val.val
                }
              }
            }
        }
    }
    ```

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

7. 通过get和set方法获取数据的组件，切换页面或再次进入时重新初始化数据

    实现动态组件的重新初始化有两种方法：

    - **使用activated() 钩子函数，activated方法会在进入组件的时候被调用**

    1. 为什么需要重新初始化？这要从vue的内置组件<keep-alive>说起，<keep-alive>的作用就是在组件间的切换过程中把状态（数据）保存在内存当中，避免重复渲染DOM。也就是说使用了<keep-alive>的组件切换之后会被保存状态，以便再次进入时可以快速显示。而activated,deactivated方法也只有在这种情况下才可以用，否则该方法不存在。
    2. 当引入keep-alive的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（后退）时，触发activated（deactivated）。

       ```js
       // 所以可以使用activated
       activated () {
          if (this.setStatus) {
               // 强制初始化
               this.setStatus('')
          }
       }
       // 或者使用deactivated
       deactivated () {
          if (this.setStatus) {
               this.setStatus('')
          }
       }
       ```

    - **监听路由变化判断是否离开当前页面。此方法不推荐，因为比较耗费性能，每一次路由的变化都会触发watch，无论是否是当前的组件。虽然可以实现需要的效果，但不是已知的最优方法。**

      ```js
      @Watch('$route')
      onRouteChange (val: any = null) {
          if (this.$route.path.indexOf('ad/data_report') > 0) {
             if (this.setStatus) {
               this.setStatus('')
             }
          }
      }

      ```

8. 输入验证

    `vue-property-decorator` 和 `vue-class-component` 库内置了`validator`库，所以无需手动引入就可以直接在vue中使用。

    ```ts
    // utils.ts
    export function isEmpty (str: string) {
        return !(str && str.trim().length)
    }

    export const rules = {
        required: (value:any) => !!value || !isEmpty(value) || '不可为空',
        phone: (value:string) => isEmpty(value) || isPhoneNumber(value) || '请检查手机号码',
        email: (value:string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return isEmpty(value) || pattern.test(value) || '请检查邮箱'
        },
        url: (value: string) => {
          const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/gi
          return isEmpty(value) || pattern.test(value) || '请检查链接'
        }
    }

    export function isPhoneNumber (input: string):boolean {
        // 通过正则表达式判断手机号码格式是否正确
        // 手机号码第一位是[1]开头，第二位到第十一位则是[0-9]中的数字
        let reg = /^1[0-9]{10}/
        return reg.test(input)
    }

    ```

    - 在vue组件的ts代码中声明
      ```html
      <!-- 在组件中使用 -->
      <!-- ref="form" 绑定组件v-select到 Vue.$refs -->
      <v-select
        ref="form" 
        :rules="rules.required">
      </v-select>
      ```
      ```js
      // 清空规则和警告
      public resetValidation () {
        return (this.$refs.form as Vue & { resetValidation: () => void }).resetValidation()
      }
      @Watch('resetAswer')
      onResetAnswer () {
        this.resetValidation()
      }
      ```



