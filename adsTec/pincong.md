# PinCong 科学上网教程

[作者：loveyou521](https://pincong.rocks/people/loveyou521)

[蓝灯](https://getlantern.org/zh_CN/index.html#)

## 科学上网新方法ShadowSocks继任者WireGuard

最近pincong帖子少了很多，应该是墙加高加回了，现在推一个新软件 WireGuard 希望更多的人能用上它来学习知识，交流经验。

WireGuard VPN的特点

WireGuard作为最新开发的VPN协议，比目前主流的VPN技术有明显优势，被称为下一代VPN。WireGuard有如下特点：
优点：
更轻便：以Linux内核模块的形式运行，资源占用小。
更高效：相比目前主流的IPSec、OpenVPN等VPN协议，WireGuard的效率要更高。
更快速：比目前主流的VPN协议，连接速度要更快。
更安全：使用了更先进的加密技术。
更易搭建：部署难度相对更低。
更隐蔽：以UDP协议进行数据传输，比TCP协议更低调。
不易被封锁：TCP阻断对WireGuard无效，IP被墙的情况下仍然可用。
更省电：不使用时不进行数据传输，移动端更省电。
不足：
处于研发初期，各种功能及支持有待完善。
由于使用UDP协议，BBR、锐速等TCP网络加速工具，对WireGuard无效。
部分运营商可能会对UDP协议进行QOS限速，WireGuard会受到一定影响。
客户端分流功能较弱，对GFWList的支持不足。

虽然有一些不足，不过WireGuard的优点要更突出一些。如果你对Shadowsocks/SSR/V2Ray等代理工具并不感冒，或者是比较喜欢接触新事物尝鲜，那么WireGuard是一个不错的选择。



这些都是copy过来的，经本人试用，确实可以在VPS服务器被封后安装wireguard不用换IP或者重建服务器继续使用，在国际出口非高峰期速度还是可以的，晚上大概7点开始 到凌晨3 4点高峰期除非你的宽带是电信精品网络，否则都是卡到爆炸，SS SSR都一样

现在wireguard客户端android  ios  windows macOS  linux  freebsd  openwrt基本上全平台都有,比较方便，不用担心

如果你有一定动手能力，买vpn感觉不靠谱，强烈建议自建VPS搭建 

现在购买vps十分简单（买之前先多看看，现在割韭菜的太多了）新手小白看教程

这些一键脚本就是一些脚本，如果担心有后门你可以自看一看脚本内容。或者去官方
wireguard.com全部手动配置

这里是wireguard一键安装教程，https://ssr.tools/1079  
这个是xshell6 绿色版  https://www.nocmd.com/1460.html

如果系统是windows10的话就不用xshell 在应用商店里搜索windows terminal 微软自己的windows终端集成了ssh  scp等工具


现在SS SSR基本上见光死， 现在用wireguard封不掉。
还有另一个anyconnect这个是思科开发的vpn  这个GFW能检测到但是不会封它，因为国内的外企 或者与国外做生意的企业都要用这个vpn协议，现在有开源openconnect兼容anyconnect 网上有很多openconnect教程，服务器端有详细配置教程和一键安装教程，客户端也是全平台支持  有需要的可以google一下

本人现在就是用虚拟机安装linux后安装wireguard  前面wireguard连服务器，本机启动shadowsocksR服务器端，然后在路由上连虚拟机上的SSR（主要是用来国内外分流 ）  建了三个VPS服务器， 后面用haproxy做负载均衡加速  


自动墙外楼挂了后就来了pincong，国内的环境放个屁都要实名注册，也没心思在网上说支言片语。
pincong的这个编辑功能太费劲 很早就想写点教程什么的。不知道pincong喜不喜欢这类技术性的，因为看帖子大家的目的不是这个。

本人现在专注这个功能，SS SSR  wireguard  anyconnect  v2ray(这个看过没试过，觉得配置太麻烦）
tinc（这个试过，没有正式使用）  其它的全部在PC （windows linux ) 手机(android ios ) 路由器OpenWRT上用过的,   
如果大家有什么疑问可以回复我们交流下。


## 科学上网新方法ShadowSocks继任者WireGuard之解疑！！！！

抱歉失误  更正  ipv6可以复活 
二维码和配置不能用  不能用


先说声抱歉，因为上班工作在流水线，实现在没太多时间导致详细教程一直没搞好，现在教程先放一放，主要对上一个帖子里众葱友提出的疑问给予解答一下。

由于最近封vps比较厉害  主要收费vpn   expressvpn purevpn nordvpn  各个ss SSR机场主大面积扑街， 所以掌握一个自己的技术才是比较靠谱的。

针对有葱友说看不懂，因为教程没放上来说 我说说流程吧，就是你去购买一个vps  要买名气比较大的.

现在vultr国外商家（最低$5/月） 和阿里云（阿里巴巴，看你胆子够不够大了）（香港轻量云 便宜 24元/月） 我前天就买了两台，vultr 日本是重灾区，注册账号  开通付款后就连上去 安装wireguard 就ＯＫ  这些都有教程  网上超多，因时间有限，就说这么多，具体后面上教程 


ｗiregaurd安装一键脚本这里有https://github.com/hongwenjun/vps_setup。github没有被封可以打开的

还有葱友说买现成的vpn30元/月，这里说明一点那些号称速度快的，流量肯定小，不限流量的速度铁定慢，以当前的网络环境，不论是谁高峰期网络都得炸  这买的vps  1T流量一个月 ，速度上高峰期大家都一样，非高峰期youtube  1080p正常看

还有朋友担心被封的  这个可以明确给各位说，上一帖子时我也是大致测试了 现在为了确定可以复活被 墙IP我从晚点8点下班到现在快凌晨2点，重建10多台vps后证实  确定可以复活  封了照样上youtube  访问pincong  这就是udp的威力  udp缺点就是会被qos就是限速，这些都不是问题

还有就是有了vps不用来做这个，可以做ftp   架设wordpress  frp内网穿透等，完全自己做主。


我现在贴上我重建的被墙的vps上的wireguard配置

Android上没有google play的可以在这里下载apkmirror
https://www.apkmirror.com/apk/wireguard-development-team/

windows pc端可以在这里下载
64位 https://download.wireguard.com/windows-client/wireguard-amd64-0.0.28.msi
32位 https://download.wireguard.com/windows-client/wireguard-x86-0.0.28.msi

iphone因为我没有，但是前几天让朋友装过，他在appstore里可以搜到（不知道他是不美区账号）
macOS我也没有 www.wireguard.com有安装 方法


如果急需上外网可以用赛风先凑合一下 可以发邮件到  get@psiphon3.com后会收到带附件的回复邮件包含Android和windows的赛风客户端先用用


下面我贴上wireguard配置的二维码，手机安装wireguard就可以扫二维码导入配置
https://i.loli.net/2019/09/30/51EUOB4wpetrxNb.png       https://i.loli.net/2019/09/30/VvhjlDG8dXaWSrx.png      https://i.loli.net/2019/09/30/9RAZYI6wF48xLkH.png    https://i.loli.net/2019/09/30/Ss3gCayWh2vj6Ep.png
这个服务器ip是 202.182.103.94  已经被 封掉了， 大家可以测试一下，因为不同的地区不同的ISP政策可能不一样  


下面是pc端的配置  这加粗的复制到记事本或者你喜欢的文本编辑器里，然后另存为wg0.conf注意扩展名conf不要错， 然后打开wireguard PC客户端 add tunnel 找到保存的文件就可以

这有三个配置随意复制一个就可以，分隔线之间的内容，别搞错了。

-----------------------------------------------------------
[Interface]

PrivateKey = 0Fy06sDVu/W/klZ6XPxm5uNecTyx7dZzWgqHJZGqMUU=
Address = 10.0.0.8/24, fd08:620c:4df0:65eb::8/64
DNS = 8.8.8.8, 2001:4860:4860::8888

[Peer]
PublicKey = +WwtCPdnJ+sw88PTpAjxRDypDUvPdnllELKgnZGo+xk=
Endpoint = 202.182.103.94:24623
AllowedIPs = 0.0.0.0/0, ::0/0
PersistentKeepalive = 25


--------------------------------------------------------------
[Interface]

PrivateKey = CGWI3BpskW6pCryHq83X6QFS6xL862HHBFoxTxyxkUU=

Address = 10.0.0.198/24, fd08:620c:4df0:65eb::198/64

DNS = 8.8.8.8, 2001:4860:4860::8888



[Peer]

PublicKey = +WwtCPdnJ+sw88PTpAjxRDypDUvPdnllELKgnZGo+xk=

Endpoint = 202.182.103.94:24623

AllowedIPs = 0.0.0.0/0, ::0/0
PersistentKeepalive = 25




--------------------------------------------------------------------
[Interface]

PrivateKey = wKUbUW4VDJIIyEutZ0g/sUb9L4DoBBK+4Im94zpfbGA=
Address = 10.0.0.186/24, fd08:620c:4df0:65eb::186/64
DNS = 8.8.8.8, 2001:4860:4860::8888

[Peer]
PublicKey = +WwtCPdnJ+sw88PTpAjxRDypDUvPdnllELKgnZGo+xk=
Endpoint = 202.182.103.94:24623
AllowedIPs = 0.0.0.0/0, ::0/0
PersistentKeepalive = 25

-------------------------------------------------------------------------------


这个服务器主要给大家看看wireguard好不好用，时效不会太长。测试完了各位就可以放心，然后自己动手了。如果有搞到被封的vps的朋友 ， 或者搞不定的，私信我，帮大家解决。
  有人自由的空间，才能学到更多的知识，有了知识，就有了力量。
         好了，马上2点了，早上7点要起来上班。先到这里。