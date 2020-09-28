import React from 'react';
import {ReactComponent as Check} from '../assets/check.svg';
import {ReactComponent as Icon1} from '../assets/tishi.svg';
import {ReactComponent as Icon2} from '../assets/wenjuan.svg';
import {ReactComponent as Icon3} from '../assets/xiaojuchang.svg';

import Header from '../components/Heaader'

import '../styles/Week.scss';

  
class CheckList extends React.Component{
  state = {
    rank: 1
  }
  click = (n)=>{
    this.setState({rank:n})
    
  }
  render(){
    const {rank} = this.state
    return (
      <td className='check-list'>
        <div onClick={()=>this.click(1)}><Check style={{opacity:rank===1?1:0}} className='check'/>优</div>
        <div onClick={()=>this.click(2)}><Check style={{opacity:rank===2?1:0}} className='check'/>良</div>
        <div onClick={()=>this.click(3)}><Check style={{opacity:rank===3?1:0}} className='check'/>中</div>
      </td>
    )
  }
}


class Week extends React.Component{

  render(){
    return (
      <div id="week">

        {/* 头部信息 */}
        <Header {...this.props}/>

        <div className='header'>
          <Icon1/> <h1>知识点内容</h1>
        </div>
        <table className='outline' >
        <tbody>
          <tr>
            <td colSpan='2'>复习内容</td>
          </tr>
          <tr>
            <td>单词</td>
            <td>{this.props.words}</td>
          </tr>
          <tr>
            <td>编程知识</td>
            <td>
                <ol>
    {this.props.data&&this.props.data.map((v,i)=> <li key={i}>{v}</li>)}
                </ol>
            </td>
          </tr>
          </tbody>
        </table>
  
  
        <div className='header'>
          <Icon2/> <h1>课前任务完成情况</h1>
        </div>
        <table className='pre' >
          <tbody>
          <tr>
            <td>任务内容</td>
            <td>完成情况</td>
          </tr>
          <tr>
            <td>上次作业</td>
            <CheckList />
          </tr>
          <tr>
            <td>单词听写</td>
            <CheckList />
          </tr>
          <tr>
            <td>编程回顾练习</td>
            <CheckList />
          </tr>
          </tbody>
        </table>
  
        <div className='header'>
          <Icon3/> <h1>课堂表现情况</h1>
        </div>
        <table className='current'>
        <tbody>
          <tr>
            <td>任务内容</td>
            <td>完成情况</td>
          </tr>
          <tr>
            <td>编程笔记</td>
            <CheckList />
          </tr>
          <tr>
            <td>编程练习</td>
            <CheckList />
          </tr>
          <tr>
            <td>课堂提问回答</td>
            <CheckList />
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Week;
