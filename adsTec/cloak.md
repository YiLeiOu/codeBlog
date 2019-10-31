# cloak 定向展示

## 定义

> cloak 或者 cloaking 是一个技术手段名称，常被应用在广告投放领域，通过判断广告点击者的身份是普通用户还是流量主或广告主来分别展示不同网页内容的一种技术。本质上就是广告投放者为了最大化提高广告的转化率会倾向于制作一些极具诱导性，但是不被广告主或者流量主所允许的[landing page]()去引诱用户注册、下载或进行购买。

## 实现

### 自有服务器对访问用户的身份进行判断


#### 通过php程序

> 通过php程序判断访客的真实身份然后根据判断结果选择性展示不同的landing page有几种方案。其中必须的条件是后台的判断程序以及安全landing page。

**后台的判断程序：** 

- 通过当前访客的IP获取该IP的详细信息，包括国家、城市、ISP等等进行判断。


    ```
    {
        "query": "160.20.61.2",
        "status": "success",
        "continent": "Asia",
        "continentCode": "AS",
        "country": "Hong Kong",
        "countryCode": "HK",
        "region": "HEA",
        "regionName": "Eastern",
        "city": "Chai Wan",
        "district": "",
        "zip": "",
        "lat": 22.2646,
        "lon": 114.237,
        "timezone": "Asia/Hong_Kong",
        "currency": "HKD",
        "isp": "Gateway Technology Development Company Limited",
        "org": "Hong Kong Data Centre Limited",
        "as": "AS58411 Gateway Technology Development Company Limited",
        "asname": "GTDCL-HK",
        "mobile": false,
        "proxy": false
    }

    ```


**安全landing page：**

1. 嵌入第三方正规电商网站

    用iframe标签把所属投放品类的头部商家页面嵌入到自己的安全landing page 中。这样做的好处是简单快捷；坏处也很明显就是iframe别的网站，还是很容易通过点击记录发现landing page 有问题。

2. 制作符合规则的lander

    在自有服务器中建立符合规范的safe page页面，当用户点击追踪链接向自有服务器请求数据，php程序根据发起请求的IP地址获取到ISP和IP所在的国家进行判断，如果判断是广告审查人员php程序就返回合规的safe page，否则返回money page给真实用户。

3. 制作真实的内容站或电商站




### 直接使用第三方工具进行cloak（一般都要付费）

- [trafficarmor](https://trafficarmor.com/amember/signup/paypal)

- [ipcloak](https://www.ipcloak.com/)


**参考代码：**

[FB实战cloak](https://cuihuanghuang.com/post/667.html)

```php
<?
//基础设置
$safe_page_url = "https://tracker.com/safePage.php";//安全页
$money_page_url = "https://tracker.com/moneyPage.php";//真实LP
$reviewer_isp = "facebook"; //审核人员ISP
$reviewer_country = "IE"; //审核人员国家


//获取访客IP
function getUserIP()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}


$vistor_ip = getUserIP();


//检查IP属性
$ip_api = 'http://ip-api.com/json/'.$vistor_ip; // IP信息获取接口

$header = array();
// 设置请求头信息
$header[] = 'Authorization:';
$header[] = 'Accept:application/json';
$header[] = 'Content-Type:application/json;charset=utf-8';

$curl = curl_init();  //初始化
curl_setopt($curl,CURLOPT_URL,$ip_api);  //设置url
curl_setopt($curl,CURLOPT_HTTPAUTH,CURLAUTH_BASIC);  //设置http验证方法
curl_setopt($curl,CURLOPT_HTTPHEADER,$header);
curl_setopt($curl,CURLOPT_HEADER,0);  //设置头信息
curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);  //设置curl_exec获取的信息的返回方式

$result = curl_exec($curl);
if($result === false){
    echo 'error:';
    echo curl_errno($curl);
    exit();
}

curl_close($curl);

$json = json_decode($result, true);


//判断流量是否需要过滤
if (stripos($json['isp'], $reviewer_isp) !== false || stripos($json['countryCODE'], $reviewer_country) !== false) {

    echo file_get_contents($safe_page_url);//如果中标显示安全页

} 
else {
  // 输出money page
  echo '<!DOCTYPE html>
  <html lang="en">
  	<head>
  		<meta charset="utf-8">
  		<meta http-equiv="X-UA-Compatible" content="IE=edge">
  		<meta name="viewport" content="width=device-width, initial-scale=1">
  		<style>body,iframe{overflow:hidden;height:100%}body,html,iframe{height:100%}body{margin:0;padding:0}iframe{width:100%}</style>
  	</head>
  	<body>
  		<iframe src='.$money_page_url.' frameborder="0" height="100%" width="100%"></iframe>
  	</body>
  </html>';//未中标用iframe显示真实LP
  }
?>

```