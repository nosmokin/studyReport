import React from 'react';
import {ReactComponent as Check} from './check.svg';
import {ReactComponent as Icon1} from './tishi.svg';
import {ReactComponent as Icon2} from './wenjuan.svg';
import {ReactComponent as Icon3} from './xiaojuchang.svg';
import logo from './logo.jpg'
// import {ReactComponent as Icon5} from './taolunqu.svg';
import './App.scss';
import html2canvas from 'html2canvas'


  
class CheckList extends React.Component{
  state = {
    rank: 1
  }
  click = (n)=>{
    this.setState({rank:n},()=>{
      this.props.dad()
    })
    
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


class App extends React.Component{
  state = {
    name:'',
    names: [],
    nums: '',
    date: '',
    words: '',
    hide: false,
    data : [],
    href : '',
  }
  click = (e)=>{
    console.log(e)
    const body = document.getElementsByTagName('body')[0]
    html2canvas(body).then(canvas => {
      const imgUrl = canvas.toDataURL();
      // 获取截图base64 
      console.log(imgUrl)
      this.setState({href:imgUrl})
    })
  }

  my_fileReader(e) {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    // 用readAsText读取TXT文件内容
    reader.readAsText(e.target.files[0]);
    reader.onload = function (e) {
        console.log(e.target.result); 　　 //读取结果保存在字符串中
        // let my_str = e.target.result;　　　　//直接保存全部数据为一个字符串
        // let my_arr = my_str.split(/[\s\n]/); 　　//按空格和换行符切割字符串，并保存在数组中
        let b = e.target.result.split('\n').filter(v=>v)
        const names = b.shift().split(',')
        const [nums, date] = b.shift().split(',')
        const words = b.shift()

        this.setState({
            name: names[0],
            names,
            nums,
            words,
            date,
            data: b
        }, ()=> this.click());
    }.bind(this)
  }

  changeSelect = (e)=>{
    console.log(e.target.value)
    this.setState({name:e.target.value},()=>this.click())
  }

  render(){
    return (
      <div className="App">
        {this.state.hide?'':<input type="file" id="file" onChange={this.my_fileReader.bind(this)}/>}
        <div className='nav'>
          
          <img onClick={()=>this.setState({hide: !this.state.hide})} alt='' src={logo}/>
          <div>
              <h1 onClick={this.click}>达内童程周学习报告</h1>
              <div>
                <span>姓名：<span><select onChange={this.changeSelect}>
                        {this.state.names.map((v,i)=><option key={i}>{v}</option>)}
                  </select></span></span>
                <a href={this.state.href} download={this.state.name+'.jpg'}><span>课次：<span>{this.state.nums}</span></span></a>
                <span>日期：<span>{this.state.date}</span></span>
              </div>
          </div>
        </div>
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
            <td>{this.state.words}</td>
          </tr>
          <tr>
            <td>编程知识</td>
            <td>
                <ol>
    {this.state.data.map((v,i)=> <li key={i}>{v}</li>)}
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
            <CheckList dad={this.click}/>
          </tr>
          <tr>
            <td>单词听写</td>
            <CheckList dad={this.click}/>
          </tr>
          <tr>
            <td>编程回顾练习</td>
            <CheckList dad={this.click}/>
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
            <CheckList dad={this.click}/>
          </tr>
          <tr>
            <td>编程练习</td>
            <CheckList dad={this.click}/>
          </tr>
          <tr>
            <td>课堂提问回答</td>
            <CheckList dad={this.click}/>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
