## react 创建项目
### 简单的安装使用
- create-react-app安装起来实在是太简单，只需要一条命令，不像别的脚手架，还需要去clone整个脚手架的源码，再在那基础上改。
```bash
  npm install -g create-react-app
```

- 装完之后，生成一个新的项目，可以使用下面的命令：

```bash
  create-react-app my-app
  cd my-app/
```

- 创建了my-app目录，这个时候，使用下面的命令就可以开始开发应用了。
```bash
  npm start
```
- 默认情况下，会在开发环境下启动一个服务器，监听在3000端口，它会主动给你打开浏览器的，可以立刻就看到这个app的效果。

- [详细](https://blog.csdn.net/qtfying/article/details/78665664)

> 如果create-react-app my-app报错，可能是nodejs版本的问题，nodejs8.9报错了，升级nodejs到10.11.0就可以正常运行了