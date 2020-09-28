import React from 'react';
import { ReactComponent as Icon1 } from '../assets/tishi.svg';
import { ReactComponent as Icon2 } from '../assets/wenjuan.svg';
import { ReactComponent as Icon3 } from '../assets/xiaojuchang.svg';
import Header from '../components/Heaader'

import '../styles/Month.scss';


class Score extends React.Component {
  state = {
    num: 90
  }
  handleChange(e) {
    let {value} = e.target
    if (e.target.value<0) value = 0
    if (e.target.value>100) value = 100
    this.setState({
      num: value
    })
  }
  render() {
    return (
      <td className='score-bar'>
        <div><div style={{ width: this.state.num + '%' }}></div></div>
        <span><input type='text' onChange={this.handleChange.bind(this)} value={this.state.num} />/100</span>
      </td>
    )
  }
}
class Month extends React.Component {

  render() {
    const perform = ['英语掌握', '知识点掌握', '项目实现情况','编程练习情况','月综合测试']
    return (
      <div id='month'>

        {/* 头部信息 */}
        <Header {...this.props}/>

        {/* 月综合表现 */}
        <div className='header'>
          <Icon3 /> <h1>课堂综合表现情况</h1>
        </div>
        <table className='performance'>
          <tbody>
            {perform.map((v,k)=>(<tr key={k}><td>{v}</td><Score /></tr>))}
          </tbody>
        </table>

        {/* 知识点大纲 */}
        <div className='header'>
          <Icon1 /> <h1>当月知识点大纲</h1>
        </div>
        <table className='outline' >
          <tbody>
            <tr><td></td><td>当月知识点内容</td></tr>
            <tr>
              <td>单词</td>
              <td>{this.props.words}</td>
            </tr>
            <tr>
              <td>编程知识</td>
              <td>
                <ol>
                  {this.props.data&&this.props.data.map((v, i) => <li key={i}>{v}</li>)}
                </ol>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 老师评语 */}
        <div className='header'>
          <Icon2 /> <h1>综合评价</h1>
        </div>

        <table className='pre' >
          <tbody>
            <tr>
              <td>老师评语</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                {this.props.comment}
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    );
  }
}

export default Month;
