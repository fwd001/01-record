## 1.React 基本语法
```js 
  import 'React' from 'react'
  import 'reactDom' from 'react-dom'

  / 1. 创建虚拟DOM
// react.createElement(标签名, 属性对象, ...子元素)
let div = react.createElement('div', {
    id: 'box',
    title: '这是react中的div'
}, '这是div的内容');


let ul = react.createElement('ul', {
        className: 'list'
    }, react.createElement('li', {
        className: 'item'
    }, 'li标签的内容'),
    react.createElement('li', {
        className: 'item'
    }, 'li标签的内容'),
    react.createElement('li', {
        className: 'item'
    }, 'li标签的内容'),
    react.createElement('li', {
        className: 'item'
    }, 'li标签的内容'))

// 2. 将虚拟DOM渲染到页面中
// reactDom.render(要渲染的元素, 目标位置)

let fm = react.createElement('div', {
    className: "form"
},
    react.createElement('label', {
        htmlFor: "txt"
    }, "姓名"),
    react.createElement('input', {
        type: "text",
        id: "txt"
    })
)

// dom元素属性有两个比较特殊的：
// 类样式： 需要使用 className
// for属性： 需要使用 htmlFor

reactDom.render(fm, document.getElementById('app'));
```

## 2.jsx 语法
```js
// JSX语法： 可以直接在JS代码中书写HTML代码！
// JSX语法无法直接在浏览器中运行
// 如果想要使用JSX语法，那么需要在打包的时候，对JSX的代码进行转换，转换成浏览器可以识别的代码
// 对于JSX转码，还是使用babel来实现
// 只需要为JSX设置对应的转码规则即可 （babel-preset-react）

// jsx中必须注意  className和htmlFor的写法
// js中的但标签必须 以 /> 结束


let dv = <div id='box'>
    <h1>Shopping List for</h1>
    <ul className="list">
        <li>Instagram</li>
        <li>WhatsApp</li>
        <li>
            <label htmlFor='txt'>姓名</label>
            <input type="text" id="txt" />
        </li>
    </ul>
</div>


// JSX语法的渲染过程
// 1. JSX语法会被babel解析成react.createElement
// 2. react.createElement会创建出来虚拟dom
// 3. 当调用Render的时候，react会根据虚拟dom创建出来真实的dom
// 4. 将真实的dom进行渲染

ReactDOM.render(dv, document.getElementById('app'))
```
## 3.循环遍历
```js
let dv = <div id="box">
    {/* <span>
        我叫{Math.random() > 0.5 ? "李明达" : "郭达"}
        <br />
        我今年{age}岁

        {[1, 2, 3, 4].join("----")}
    </span> */}

    <ul>
        {
            arr.map(v => {
                return <li className={v.brand} key={v.id}>{v.brand}: {v.price}</li>
            })
        }
    </ul>
</div>
```

## 4.写样式

```js
let styleObj = { color: 'red', width: 200, height: 200, border: "1px solid red" };

let dv = <div>
    <div style={styleObj}>这是一个盒子</div>
</div>

```

## 5.函数组件无状态组件
```js
// React中的组件的使用方式
// 1. 使用函数创建组件 (无状态组件)
// 功能： 只是负责展示某些数据，这些数据都是父组件传递过来的！

//1. 函数首字母必须大写
//2. 函数必须有返回值， 要么是jsx对象 要么是 null
//3. 如果要写jsx表达式，则需要将jsx表达式用()括起来，避免换行导致没有返回值的问题
//4. 组件必须有个根元素

function Comp() {
    return (
        <div>
            <div>
                这是组件的内容
            </div>

            <div>
                这是组件的第二部分内容
            </div>
        </div>
    )
}

let dv = <div>
    内容
    <Comp />
</div>
```

## 6.组件间传值
```js 
// 函数创建的组件（无状态组件） 展示的内容一般都是从外面传进来的
// 我们只需要借助父子组件传值的方式，将数据传递给组件即可
// 父给子传：  通过属性的方式传递， 组件中可以通过形参接收
// 子给父传：  通过属性的方式将函数传递给组件，在组件内部可以直接调用该函数，给外界传递数据

// 注意： props接收到的数据，都是只读的，不可以进行修改！

function Login(props) {
    console.log(props);
    // props.func(123);
    props.name = "刘德华"
    return (
        <div>
            <h1>这是一个组件</h1>
            <div></div>
        </div>
    )
}

let obj = {
    name: "张学友",
    age: 18,
    sing(value) {
        console.log("我和你吻别", value)
    }
}

reactDom.render(<Login name={obj.name} func={obj.sing}/>, document.getElementById('app'))
// reactDom.render(<Login {...obj}/>, document.getElementById('app'))
```