1. 忘记密码，通过修改数据库重设密码

    登录phpMyadmin ，进入到网站对应的数据库，然后打开 wp_users 那个表。把user_pass的值编辑为`5d41402abc4b2a76b9719d911017c592`===>`hello`。保存后用hello作为密码登录即可。成功进入wordpress后台再更新密码。


2. 自动显示封面图

    遇到这个问题，首先肯定是去Google上搜一下，找到一些别人分享的方法，有现成的代码可以用，复制到functions.php文件下。满怀希望去刷新页面，结果没有效，这类型的代码又试了另外一个，结果同样是不行。

    **类似这种：**
    ```
    function autoset_featured() {
          global $post;
          $already_has_thumb = has_post_thumbnail($post->ID);
              if (!$already_has_thumb)  {
              $attached_image = get_children( "post_parent=$post->ID&post_type=attachment&post_mime_type=image&numberposts=1" );
                          if ($attached_image) {
                                foreach ($attached_image as $attachment_id => $attachment) {
                                set_post_thumbnail($post->ID, $attachment_id);
                                }
                           }
                        }
    }  //end function
    add_action('the_post', 'autoset_featured');
    add_action('save_post', 'autoset_featured');
    add_action('draft_to_publish', 'autoset_featured');
    add_action('new_to_publish', 'autoset_featured');
    add_action('pending_to_publish', 'autoset_featured');
    add_action('future_to_publish', 'autoset_featured');

    ```
    再找别的方法，在一篇文章中看到推荐一个插件：[**Set All First Images As Featured**](https://wordpress.org/plugins/set-all-first-images-as-featured/)。下载下来，解压、复制到plugins目录下，回到wordpress控制台刷新安装此插件，运行一下，运行结果提示异常。

    刷新页面一看，封面图区域出来了，但是图片没有显示。用浏览器检查页面，发现图片的路径是默认的上传路径。但是图片并不是放在那个目录，所以去数据库控制台修改wp_options表中upload-path的值为图片目录，刷新页面。这是发现图片有了，可是图片尺寸是1*1的，控制台修改样式`width:100%`,这时图片正常显示了。

    又有一个要改样式的问题。第一时间想到的是直接去php的代码中修改生成封面图的代码，一不小心就走入了坑里面。折腾了好一段时间，没有成功。改变思路，不如直接去修改样式文件？把样式文件`style.css`修改完，覆盖旧文件刷新页面，终于正常显示了。