## 基于 vue-cli 的反向代理设置及 axios 获取 json 数据

### vue-cli 反向代理设置

- 反向代理用来解决前端跨域问题，设置很简单，在 vue-cli 项目的 config 文件夹 index.js 文件下进行如下设置即可：

```js
  proxyTable: {
    // 代理规则
    '/api': { // 配置的url请求名字开头
      // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
      target: 'http://10.18.110.107',
      // https请求需要该设置
      secure: false,
      // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      // 必须设置该项
      changeOrigin: true,
      // 将 '/api' 替换成 ''
      // 重写路径运行后就代理到对应的地址
      pathRewrite: { "^/api": "" }
    }
  }
```
### 配置完成重新运行dev，即可请求数据
```js
  	axios.get('/api/tasktime')
	  .then(function (res) {
	    console.log(res)
	  })
```

- http请求本来是`axios.get('http://10.18.110.107/tasktime',{params:{num:12})`

- 就可以写成`axios.get('/api/tasktime',{params:{num:12})` 实现跨域


## [nginx反向代理传送门](https://github.com/fwd001/01-record/blob/master/01-nginx.md)