```php
<?php

/*************************
*1. mysql 版本 ===> 5.5.60
*2. php 版本 ===> 5.6.36
**************************/

$servername = 'localhost';
$username = 'root';
$passw = '000000';
$db = 'wordpressdb';


$con = new mysqli($servername,$username,$passw,$db);

if( $con->connect_error){

    die('connect fail:'.$con->connect_error.PHP_EOL);

}

$file = fopen("DataList-20191115.txt","r");

$count = 10;

$status = FALSE;


while( !feof($file) )

{
    $text = fgets($file);
    $json = json_decode($text,true);
    $id = $json['id'];
    $content = $json['text'];
    $title = $json['title'];
    $excerpt = substr($json['excerpt'],0,300).'...';
    $date = date('Y-m-d H:i:s');

    if( strlen($content) < 100 && strlen($title) < 10 ) {
        echo '$text===='.substr($text,0,300).PHP_EOL;
        continue;
    }

    echo 'curid===='.$id.PHP_EOL;
    
    $guid = 'http://www.mymobb.com/?p='.$id;

    $sql = "insert into wp_posts (
        ID,
        post_author,
        post_date,
        post_date_gmt,
        post_content,
        post_title,
        post_excerpt,
        post_name,
        post_modified,
        post_modified_gmt,
        guid) VALUES";
    
    $sql .="
    (
        '$id',
        1,
        '$date',
        '$date',
        '$content',
        '$title',
        '$excerpt',
        '$title',
        '$date',
        '$date',
        '$guid'
    );";
    $con->multi_query($sql);
    $status = TRUE;
    
}

// $sql = rtrim($sql, ','); # 删除字符串末端空白字符

if( $status === TRUE ){

    echo 'insert data successfully'.PHP_EOL;

}else{

   echo 'create table fail:'.$con->error;

}



fclose($file);
$con->close();

?>
```