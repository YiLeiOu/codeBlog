```php
$sqlTab="show table status where name ='wp_posts'";

$query=mysqli_query($con,$sqlTab);

$row = mysqli_fetch_array($query);

$curid = $row['Auto_increment'];

$increseId = $curid;

```
