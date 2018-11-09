# 基础知识

## 1.用法
```
<video src="./video/mv.mp4"></video>
<audio src="./audio/mv.mp3"></audio>
```
注意：audio和video元素必须同时包含开始和结束标签，不能使用<audio/>这样的空元素语法形式。

## 2.重要的HTML属性
`controls`:向用户显示控件，比如播放按钮。控制开始和结束，跳到新位置和调节音量。
`autoplay`:视频自动播放。
`loop`：告诉浏览器在音视频在结束时，再从头重新播放。
`preload`：auto、mete、none告诉浏览器如何下载音频。
    auto：让浏览器下载整个文件。
    mete：先获取音频文件开头的数据块，从而可以确定一些基本信息
    none:告诉浏览器不必预先下载。  

## 3.常用事件
`oncanplay`:当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）
`ontimeupdate`：当播放位置改变时运行的脚本（比如当用户快进到媒介中一个不同的位置时）
`onended`：当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）

## 4.常用方法
`play()`:开始播放音视频
`pause()`：暂停当前播放的音视频

## 5.常用API属性
`duration`:返回当前音视频的长度（以秒计）
`paused`：设置或返回音视频是否暂停
`currentTime`：设置或返回音视频中的当前播放位置
`ended`：返回音视频的播放是否已结束

# 打造自己的播放器
我们使用Javascript控制播放器的行为（自定义播放控件），实现如下功能：
- 利用html+css制作一个自己的播放控件条，然后定位到视频最下方
- 视频加载loading效果
- 播放、暂停
- 总时长和当前播放时间显示
- 播放进度条
- 全屏显示

## 1.播放控件
```js
<figure>
    <figcaption>视频播放器</figcaption>
    <div class="player">
        <video src="./video/mv.mp4"></video>
        <div class="controls">
            // 播放/暂停
            <a href="javascript:;" class="switch fa fa-play"></a>
            // 全屏
            <a href="javascript:;" class="expand fa fa-play"></a>
            // 进度条
            <div class="progress">
                <div class="loaded"></div>
                <div class="line"></div>
                <div class="bar"></div>
            </div>
            // 时间
            <div class="timer">
                <span class="current">00:00:00</span>
                <span class="total">00:00:00</span>
            </div>
            // 声音
        </div>
    </div>
</figure>
```

## 2.视频加载loading效果
一开始隐藏视频，用一个背景图片代替，等到视频加载完成可以播放时再显示视频
```css
.player {
    width:720px;
    height:360px;
    margin:0 auto;
    background:#000 url(../images/loading.gif) center/300px no-repeat;
    position:relative;
}
video {
    diaplay:none;
    height:100%;
    margin: 0 auto;
}
```

## 3.播放功能
```js
const video = document.querySelector("video");
const isPlay = document.querySelector('.switch');
const expand = document.querySelector('.expand');
const progress = document.querySelector('.progress')
const loaded = document.querySelector('.progress > .loaded');
const currPlayTime = document.querySelector('.timer > .current');
const totalTime = document.querySelector('.timer > .total');
```
当视频可以播放时，显示视频
```js
// 当视频可播放时
video.oncanplay = function() {
    // 显示视频
    this.style.display = "block";
    // 显示视频总时长
    totalTime.innerHTML = getFormatTime(this.duration);
}

```

## 4.播放、暂停
点击播放按钮时显示暂停图标，在播放和暂停之间切换图标
```js
// 播放按钮控制
isPlay.onclick = function(){
    if(video.paused) {
        video.paly();
    }else{
        video.paused();
    }
    this.classList.toggle('fa-pause');
}
```

## 5.总时长和当前播放时长显示
把获取到的毫秒数转换成我们需要的时间格式即可，提供getFormTime()函数：
```js
function getFormatTime(time) {
    var time = time || 0;

    var h = parseInt(time / 3600),
        m = parseInt(time % 3600 / 60),
        s = parseInt(time % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : s;
    s = s < 10 ? "0" + s : s;
    return h + ":" + m + ":" + s;
}
```

## 6.播放进度条
```js
// 播放进度
video.ontimeupdate = function(){
    // 当前播放时间
    var currTime = this.currentTime,
    // 视频总时长
    duration = this.duration;
    // 百分比
    var pre = currTime / duration * 100 + "%";
    // 显示进度条
    loaded.style.width = pre;
    // 显示当前播放进度时间
    currPlayTime.innerHTML = getFormatTime(currTime)
}
```
继续实现点击进度条进行跳跃播放，即我们点击任意时间点视频跳转到当前时间点播放：
```js
// 跳跃播放
progress.onclick = function(e){
    var event = e || window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
}
```

## 7.全屏显示
这个功能可以使用HTML5提供的全局API：`webkitRequestFullScreen`实现，跟video无关：
```js
// 全屏（经测试在firefox、ie全屏功能不可用，全屏API是针对webkit内核的）
expand.onclick = function(){
    video.webkitRequestFullScreen();
}
```