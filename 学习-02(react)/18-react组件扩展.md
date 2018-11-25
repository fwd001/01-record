## 1.组件的默认值和类型监测
```js 
/* 组件使用默认值 */
import React from 'react'

export default class Hi extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.msg}</div>
        )
    }

    // 浏览器不认识静态属性语法
    // env和react两个转码规则都不能将这个语法正常转换
    // 所以需要一个新的转码规则： bable-preset-stage-2
    // 1. 安装 2. .babelrc中配置
    static defaultProps = {
        msg: "msg的默认值"
    }
}

// Hi.defaultProps = {
//     msg: "msg的默认值"
// }


/* 类型监测 */
import PropTypes from 'prop-types'
function Person(props) {
    return (
        <div>
            <div>我今年{props.age + 18}岁</div>
            <div>我是{props.gender}</div>
        </div>
    )
}


Person.propTypes = {
    age: PropTypes.number,
    gender: PropTypes.oneOf(["男"])
}

reactDom.render(<Person age={18} gender="男"/>, document.getElementById("app"));
```


## 2.组件生命周期

// React组件的生命周期，一共有三个阶段
// 1. 创建阶段 Mounting
// 2. 运行与交互阶段 Updating
// 3. 卸载阶段 UnMounting

// 只有class组件有生命周期，函数组件没有！！！

// 1. 当组件刚开始被创建的时候，会首先处理props的默认值（处理defaultProps静态属性）
// 2. 初始化状态（数据）  在constructor中的代码

### 1.创建阶段
```js
// 创建阶段两个钩子函数：
// 1. componentWillMount
// 2. componentDidMount

// 如果是同步修改数据，则放在componentWillMount中比较好，因为只会调用一次render渲染
// 如果是异步修改数据，则两个放在任意一个都可以，因为都会触发两次render
class Hello extends React.Component{
    constructor(props) {
        super(props);
        // console.warn("生命周期的第一个钩子函数：constructor被执行了")
        this.state = {
            msg: "默认值"
        }
    }

    componentWillMount() {
        // componentWillMount 这个钩子函数是在元素被渲染到页面之前进行调用的
        // 在这个函数中无法访问 页面中的元素！
        // console.warn("生命周期的第二个钩子函数：componentWillMount被执行了")
        // console.log(document.getElementById("box"));
        // console.log(this.state.msg)

        // this.setState({
        //     msg: "componentWillMount中修改数据"
        // })

        // setTimeout(() => {
        //     this.setState({
        //         msg: "异步修改数据"
        //     })
        // }, 1000)
    }

    render() {
        console.warn("生命周期的第三个钩子函数：render被执行了")
        // console.log(document.getElementById("box"));
        return (
            <div id="box">这是组件中的内容： {this.state.msg}</div>
        )
    }

    componentDidMount() {
        // console.warn("生命周期的第四个钩子函数：componentDIdMount被执行了")
        // console.log(document.getElementById("box"));

        // this.setState({
        //     msg: "componentDidMount中修改数据"
        // })
        setTimeout(() => {
            this.setState({
                msg: "异步修改数据"
            })
        }, 1000)
    }
}
reactDom.render(<Hello />, document.getElementById("app"));
```

### 2.运行与交互阶段 Updating
```js
// 运行与交互阶段 Updating

// 会有两种情况导致界面重新更新：
// 1. props发生变化
// 2. state发生变化

class Son extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        // 当父组件中传递给当前组件的props发生变化的时候，会触发这个钩子函数
        console.log("父组件传进来的数据发生变化了！", nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 当组件需要更新的时候，react会自动调用这个函数
        
        // 这个函数需要返回一个布尔值，表示是否要对组件进行更新！
        
        // 如果这个函数返回值为true则正常更新组件
        // 如果这个函数返回值为false则不更新组件

        // 举个栗子！
        // 当外面穿件来的props中的msg发生变化的时候，需要重新渲染
        // 而当传进来的props中的num发生变化的时候，不需要重新渲染

        if (this.props.msg != nextProps.msg) {
            return true;
        }

        if (this.props.num != nextProps.num) {
            return false;
        }

        return true;
    }

    render() {
        console.warn("render被重新调用了")
        return (
            <div id="box">从父组件中接收到的数据： {this.props.msg}</div>
        )
    }
}

class Father extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            str: "这是父组件中的数据",
            num: 0
        }
        this.btnClick = this.btnClick.bind(this);
        this.btn1Click = this.btn1Click.bind(this);
    }

    btnClick() {
        this.setState({
            str: "这是字符串" + Math.random()
        })
    }

    btn1Click() {
        this.setState({
            num: Math.random() + ""
        })
    }
    render() {
        return (
            <div>
                <Son msg={this.state.str} num={this.state.num}/>
                <button onClick={this.btnClick}>按钮</button>
                <button onClick={this.btn1Click}>按钮</button>
            </div>
        )
    }
}

reactDom.render(<Father />, document.getElementById("app"));
```

### 3.更新阶段
```js
    shouldComponentUpdate(nextProps, nextState) {
        console.warn("shouldComponentUpdate被调用了", nextState)   
        return true;
    }

    componentWillUpdate() {
        // 当props或state发生变化，组件需要更新的时候
        // 更新视图之前，会调用这个钩子函数！
        // 如果在这个函数中获取DOM元素，则获取到的是更新之前的DOM元素
        console.warn("componentWillUpdate被调用了", document.getElementById("box").innerText)
    }

    componentDidUpdate() {
        // 当props或state发生变化，组件需要更新的时候
        // 更新视图之后，会调用这个钩子函数！
        // 如果在这个函数中获取DOM元素，则获取到的是更新之后的DOM元素
        console.warn("componentDidUpdate被调用了", document.getElementById("box").innerText)        
    }

```


### 4.卸载阶段
```js
import React from 'react'
import reactDom from 'react-dom'

class Hello extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        console.warn("组件要被卸载了！！")
    }

    render() {
        return (
            <div>组件的内容</div>
        )
    }
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.isShow ? <Hello /> : null
                }

                <button onClick={this.toggle}>Toggle</button>
            </div>
        )
    }
}

reactDom.render(<App />, document.getElementById("app"))
```

## 3.不使用ES6创建组件
```js
// 如果不使用ES6，如何创建有状态的组件（智能组件）
import React from 'react'
import reactDom from 'react-dom'

import createReactClass from "create-react-class"


// class Hello extends React.Component{
//     constructor(props) {
//         super(props);
//         this.btnClick = this.btnClick.bind(this);
//     }
//     render() {
//         return (
//             <div>这是通过es6 class关键字创建的组件</div>
//         )
//     }
//     btnClick() {
//         this.setState({});
//     }
//     static defaultProps = {

//     }
// }

var Hello = createReactClass({
    render: function() {
        return (
            <div onClick={this.btnClick}>这是通过createReactClass创建的组件</div>
        )
    },
    getDefaultProps: function() {
        return {
            msg: "默认值"
        }
    },
    getInitialState: function() {
        return {
            count: 10
        }
    },
    btnClick: function () { 
        console.log(this);
    }
})

reactDom.render(<Hello />, document.getElementById("app"));
```

## 4.fef的使用介绍
```js
import React from 'react'
import reactDom from 'react-dom'


class Hello extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            msg: "hello"
        }
        this.box = React.createRef()
    }

    componentDidMount() {
        // console.log(this.btn);
        this.btn.addEventListener("click", e => {
            this.setState({
                msg: "按钮被点击了"
            })
            console.log("被点击了")
        })

        this.ipt.focus();

        console.log(this.box)
    }

    render() {
        return (
            <div>
                <div ref={this.box}>{this.state.msg}</div>
                <input type="text" ref={ele => this.ipt = ele}/>
                <button ref={ele => this.btn = ele}>按钮</button>
                
            </div>
        )
    }
}

reactDom.render(<Hello />, document.getElementById("app"))
```

## 5.受控组件(双向绑定)
```js
// 什么是双向绑定？？
// 1. 数据的变化会导致视图的变化
// 2. 视图的变化会导致数据的变化

// 在React中，通过Value 和onChange实现双向绑定的方式被称为 受控组件！

class Hello extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            msg: "这是数据的初始值"
        }
        this.num = 0

        this.btnClick = this.btnClick.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    btnClick() {
        this.num ++;

        this.setState({
            msg: "这是数据的初始值" + this.num
        })
    }

    changeHandler(e) {
        console.log("文本框中的数据发生变化了");
        this.setState({
            msg: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.msg} onChange={this.changeHandler}/>
        
                <button onClick={this.btnClick}>改变数据</button>
            </div>
        )
    }
}
```