# PMDG自制导航数据教程
## 前言
众所周知，中国有三种机场，一种是AIP机场，一种是NAIP机场，另一种是[数据删除]，对于AIP机场，数(qia)据(qian)方已经做好了导航数据，随着每期的更新即可获得，但是NAIP这种价值50w的机场呢，就要自己做，怎么做又是一个问题，本文将简单的讲一讲常见的骚操作。
## 前期准备
**一台能打字的设备**  
~~50w~~**NAIP**
## 基础数据
打开PMDG根目录下SIDSTARS文件夹，是一个个用机场ICAO代码命名的txt文件，打开一个发现全是人话，大家都能看懂，所以本文到此结束（bushi）
当然，与其他数据相比确实PMDG简单很多，但文章还是要写，~~金币还是要嫖~~。
### FIXES
一个数据的第一段，为FIXES段，以`FIXES`为开头，并以`ENDFIXES`为结尾，中间是内容，这一写法也被应用到整个文件。这里面存放的是打点的数据，比方说AA201 CI36 ~~D21F~~（本文不讨论传统程序）之类的。那么这些数据怎么来的呢，这时我们要请出NAIP，找到一张名为**航路点坐标**的图，你会发现很多点和对应的坐标
![](https://i.loli.net/2020/07/05/kAshJjeQwnd21IT.jpg)
现在介绍一下打点的方法
`FIX LATLON NDD MM.M EDD MM.M`
这里面 `N` 代表我们小学二年级就学过的北纬，E代表北纬，DD代表两位的度数，MM.M是代表带小数的分，这里小数建议保留5位以上。
我们发现NAIP中有一些点的坐标是DD MM SS格式的，有人说不会转~~，不会吧不会吧，不会有人真的有人不会小学数学吧~~。
还有一种打点方法是径向线打点
`FIX COLOCATED 基准点 角度 距离(单位海里)`
用来打一些CI FI 的点有用
### RNWS
这一段以`RNWS`开头，`ENDRNWS`结尾
中间写入跑道，如
```
RNWS
RNW 18
RNW 36
ENDRNWS

```
## 离场航段
本段以`SIDS`开头，`ENDSIDS`结尾
每一行写一条程序，开头均以`SID 程序名 跑道`开头，如`REP61K RNW 18`
关于`TRANSITION`,在写好的SID下换行，空四格，`TRANSITION 分支点名字 航路`[1]
![](https://i.loli.net/2020/07/05/XJL2SaKTufrg1Zt.jpg)
这是我YY的离场程序，起飞只需要写到AAA，之后
`TRANSITION BBB FIX BBB`
`TRANSITION CCC FIX CCC`
国内机场不常见，好像ZSJG(济宁/曲阜)有，大家可以试试~~支付宝到账 五——十——万——~~
### AT OR ABOVE/BELOW
用于限制高度，合用的时候below在前，后面跟高度，单位是英尺
如果有个点给了确定的高度，直接在这个点后加高度，无需任何的描述
### TRK/HDG
给一个航向飞，没什么难度，要注意TRK是磁航向，HDG是真航向
### UNTIL
主要用于离场航段的初始爬升，通常与TRK/HDG合用，如下面**TURN LEFR/RIGHT**部分的起始上高，可以描述为`TRK 183 UNTIL 1000 .........`
### FIX
这个没啥好讲的，如下图
![](https://i.loli.net/2020/07/05/wdLjbeV9zJCOKcD.jpg)
这是最简单的一种，直接`FIX DY108 FIX REPOL`
还有一种飞越点，用`FIX OVERFLY 航点`
### TURN LEFR/RIGHT
这个也比较直接，可以获得圆润的转弯
![](https://i.loli.net/2020/07/05/bHVj6Xk4WOMrpTF.png)
如这一段离场，描述为`TRK 183 UNTIL 1000 TURN LEFT DIRECT DY102 AT OR ABOVE 3900`
## 进场程序
本段以`STARS`开头，`ENDSTARS`结束
基础格式为
```
STAR 进场程序名 进场航路
  RNW 跑道编号
```
记得RNW前空两格
其余语法参照离场航段，一样的
## 进近程序
本段以`APPROACHES`开头，`ENDAPPROACHES`结束
基础格式为
```
APPROACH 程序名 FIX CIXX FIX FIXX RNW "跑道号" TRK "跑道航向" (复飞航路)
  TRANSITION 过渡点名字 航路
```
TRANSITION前空一格
### 关于CI FI
这是最有趣的，CI是IF，FI是FAF，至于打点，你看了航图就懂了，记得用反向的径向线[2]
### 关于命名
ILS进近用`ILS跑道程序代码(X/Y/Z)`如`ILS23Z`
VOR/DME用`VDM跑道`如`VDM23`
别的就见仁见智了
## References
[1] qfa7301.PMDG 进离场导航数据制作教程[EB/OL].(2015-8-14)[2020-7-5].https://bbs.sinofsx.com/forum.php?mod=viewthread&tid=154512  
[2] Leoneus.机器语言 中篇[EB/OL].(2014-1-20)[2020-7-5].https://bbs.sinofsx.com/thread-104936-1-1.html
