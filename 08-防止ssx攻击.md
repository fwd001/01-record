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
  ReplaceSeperator (str) {
    str += ''
    if (!str) {
      return str
    }
    return str.replace(/\r\n|\r|\n/g, '<br/>')
  },
```
