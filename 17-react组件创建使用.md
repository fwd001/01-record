## 1.class创建组件传值
```js 
import React from 'react'
import reactDom from 'react-dom'
class Comp extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            msg: "hello world"
        }
    }

    btnClick() {
        alert("按钮被点击了");
    }
    
    render() {
        return (
            <div>
                这是一个组件
                <br />
                {this.state.msg}

                <br />
                <button onClick={this.btnClick}>按钮</button>

                <br />
                {this.props.num}
            </div>
        )
    }
}


// class创建的组件也可以通过标签的属性进行数据传递
// 在class组件内部，可以直接通过this.props来获取传递进去的数据！！！

let count = 123

reactDom.render(<Comp num={count}/>, document.getElementById('app'));
```

## 2.将组件储存在单文件中
```js
import React from 'react'
import reactDom from 'react-dom'


import Login from './components/login'
import Register from './components/register'

let app = <div>
    <Login />
    <Register />
</div>

reactDom.render(app, document.getElementById('app'));
```
```js
// ./components/register
import React from 'react'

export default class Register extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            msg: "这是注册模块"
        }
    }

    render() {
        return (
            <div>
                {this.state.msg}
            </div>
        )
    }
}
```

## 3. props.children用法
```js
// props.children是用来获取组件在使用的时候，标签内部写的内容的，类似于vue中的slot
function Hello(props) {
    // console.log(props);
    return (
        <div>这是Hello组件 {props.children}</div>
    )
}


let app = <div>
    <Hello>这是放在组件标签中的内容</Hello>
</div>
```
## 4.处理函数中的this指向
```js
class Hello extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }

        // 给点击事件绑定this，让他永远都是组件实例
        this.btnClick = this.btnClick.bind(this);
    }

    // 注册事件的时候，this指向的问题处理
    // 如果直接将btnClick 赋值给按钮的onClick， 那么这个函数中的this将会是undefined
    // 我们如果要保证功能能够正常，则需要保证点击事件中的this是指向组件实例的！

    // 解决方案1：
    //  在构造函数内，给btnClick函数绑定this

    // 解决方案2：
    //  在绑定事件的时候，绑定一个箭头函数，在箭头函数中手动调用事件处理函数

    // 解决方案3：
    // 在绑定事件的时候，绑定 this.btnClick.bind(this)
    btnClick() {
        this.state.count++;
        console.log(this.state.count);
    }

    render() {
        return (
            <div>
                当前的count值为: {this.state.count}
                <br />
                <button onClick={this.btnClick}>+1</button>


                {/* <button onClick={() => { this.btnClick() }}>+1</button> */}

                {/* <button onClick={this.btnClick.bind(this)}>+1</button> */}
            </div>
        )
    }
}
```

## 5.setState使用
```js
class Hello extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
        this.btnClick = this.btnClick.bind(this);
    }

    btnClick() {
        // this.state.count++;
        // 通过调用this.setState方法，可以触发视图的重新渲染

        // 1. 直接调用，修改内容
        // this.setState({
        //     count: this.state.count + 1
        // });

        // 2. 调用修改内容，之后可以写回调函数，获取修改后的数据
        // this.setState({
        //     count: this.state.count + 1
        // }, function () { 
        //     // setState是一个异步操作
        //     // 所以无法直接在setState之后直接获取修改后的内容
        //     // 如果要获取，则需要在这个回调函数中获取 
        //     // 这个回调函数会在数据修改成功之后被调用！
        //     console.log(this.state.count)
        // })
        
        // 3. 传递一个函数作为参数，函数中需要返回一个对象！
        // this.setState(function (prevState, props) { 
        //     // console.log(prevState, props)
        //     // return {
        //     //     count: prevState.count + props.step
        //     // }

        //     return {
        //         count: prevState.count + 1
        //     }
        // })  


        // this.setState({
        //     count: 1
        // })

        // this.setState({
        //     count: 2
        // })

        // this.setState({
        //     count: 3
        // }) 
    }

    render() {
        return (
            <div>
                当前的count值为: {this.state.count}
                <br />
                <button onClick={this.btnClick}>+1</button>
            </div>
        )
    }
}

reactDom.render(<Hello step={10}/>, document.getElementById('app'));
```
