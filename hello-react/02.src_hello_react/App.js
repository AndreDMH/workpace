//外壳组件
// import React from 'react';
import React,{Component} from 'react'
import Hello from './components/Hello/Hello'
import Welcome from './components/Welcome'
// class App extends React.Component{
//   render(){
//     return(
//       <div>
//         <h1>hello react</h1>
//       </div>
//     )
//   }
// }
//创建并暴露App组件
export default class App extends Component{
  render(){
    return(
      <div>
        <Hello/>
        <Welcome/>
      </div>
    )
  }
}