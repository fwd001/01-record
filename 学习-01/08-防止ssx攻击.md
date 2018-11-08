## 去掉 script、style 标签和内容及所有非 br 标签

```js
  changeInput (str) {
    // var value = ReplaceSeperator(str);
    // 去掉script、style标签和内容及所有非br标签
    var value = str
    if (str !== null && str !== undefined && str !== 'undefined') {
      value = str.replace(/(<script.*?>.*?<\/script>)|(<style.*?>.*?<\/style>)|<(?!br).*?>/ig, '')
      return value
    } else {
      return value
    }
  },
  // 把回车转换成换行 输出innerHTML
  ReplaceSeperator (str) {
    str += ''
    if (!str) {
      return str
    }
    return str.replace(/\r\n|\r|\n/g, '<br/>')
  },
```

## 将文本的链接替换成a标签输出
```js
ReplaceSeperator (str) {
  str += ''
  if (!str) {
    return str
  }
  var urlReg = /(http:\/\/|ftp:\/\/|https:\/\/|www.)[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/g
  var array = str.match(urlReg)
  if (!array) {
    return str.replace(/\r\n|\r|\n/g, '<br/>')
  }
  // 设置!!为临时占位符
  var rpStr = str.replace(urlReg, '!!')
  array.forEach((el, i, arr) => {
    // 匹配协议，因为Vuejs会对href属性自动加上' http://'
    let link = ''
    if (el.match('http://') || el.match('ftp://') || el.match('https://')) {
      // console.log('yes')
      link = ('<a target="_blank" class="updataLink" href="' + el + '">' + el + '</a>')
    } else {
      // console.log('false')
      link = ('<a target="_blank" class="updataLink" href="http://' + el + '">' + el + '</a>')
    }
    // console.log(rpStr)
    // console.log(links)
    // 将字符串里的!! 替换为link的内容并重新赋值给 rpStr
    rpStr = rpStr.replace('!!', link)
    // console.log('result',rpStr)
    return rpStr
  })
  return rpStr.replace(/\r\n|\r|\n/g, '<br/>')
  // return rpStr
},
```
