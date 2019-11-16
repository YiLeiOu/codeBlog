1. 进入MySQL命令行模式

    - mysql -u root -p

    ```php
    mysql -u root -p 
    Enter password:  # 输入密码
    mysql>           # 成功进入
    ```
    - mysql 
    ```php
    mysql
    mysql>           # 不用输密码，成功进入
    ```

2. 查看所有数据库：

    ```shell
    mysql> show databases;
    ```
3. 选中某个数据库进行操作：

    ```shell
    mysql> use myDB;
    ```
4. 查看所有数据表：

    ```shell
    mysql> show tables;
    ```
5. 查看某个数据表的所有字段（列）：

    ```shell
    mysql> show columns from my_table;
    ```


