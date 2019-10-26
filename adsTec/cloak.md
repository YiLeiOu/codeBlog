# cloak 定向展示

## 定义

> cloak 或者 cloaking 是一个技术手段名称，主要应用在广告投放领域，通过判断广告点击者的身份是普通用户还是流量主或广告主来分别展示不同网页的一种技术。根本起源是广告投放者为了最大化提高广告的转化率可能会倾向于制作一些诱导性较强，但是不被广告主或者流量主所允许的[landing page]()去引诱用户注册、下载或购买。

## 实现

### 通过自有服务器对访问用户的身份进行判断

#### 通过服务器判断重定向


#### 通过php程序进行判断选择性展示

通过php程序判断访客的真实身份然后根据判断结果选择性展示不同的landing page有几种方案。其中必须的条件是后台的判断程序以及安全landing page。

**后台的判断程序：** 

通过当前访客的IP获取该IP的详细信息，包括国家、城市、ISP等等进行判断。

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

    

3. 制作真实的内容站或电商站




### 直接使用第三方工具进行cloak（一般都要付费）

- [trafficarmor](https://trafficarmor.com/amember/signup/paypal)

- [ipcloak](https://www.ipcloak.com/)



**参考：**

[实战cloak](https://cuihuanghuang.com/post/667.html)