import React from 'react';
import {BrowserRouter as Router,Redirect, NavLink, Route, Switch} from 'react-router-dom'
import Week from './pages/Week'
import Month from './pages/Month'
import html2canvas from 'html2canvas'
import './styles/App.scss';

const msg = '周锦程同学,英语单词发音基本标准，拼写和默写都能跟上同学们的进度。知识点完全掌握，能做到融会贯通。在编程过程中认真思考，独立、快速地完成了代码。在亲自出码环节，能够独立并快速完成题目要求，代码工整并实现正确的效果。思维逻辑方面还可以。能够专注的跟随老师的讲课思想进行转换，并且有自己的新奇想法。编写正确，运行没问题，代码整齐，编写速度一般。课上非常积极，在老师提出问题时总是最快地举起小手，回答问题时非常自信。在完成案例的过程中遇到不懂的问题也能及时地向老师请教，特别积极！'

class App extends React.Component{
  state = {
    comment: msg
  }
  click = ()=>{
    const targetDom = document.getElementById('main-page')

    html2canvas(targetDom,{ignoreElements: (e)=>{
      if(e.id==='ignore') return true
    }, scale:2}).then(canvas => {
      let a = document.createElement('a');
      a.href = canvas.toDataURL("image/png");
      let name = '无'
      name = this.state.name && this.state.name
      a.download = name + '.png';
      a.click()
    })
  }
  my_fileReader(e) {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function (e) {
        console.log(e.target.result); 　　
        // let my_str = e.target.result;　　　　//直接保存全部数据为一个字符串
        // let my_arr = my_str.split(/[\s\n]/); 　　//按空格和换行符切割字符串，并保存在数组中
        let b = e.target.result.split('\n').filter(v=>v)
        const names = b.shift().split(',')
        const [nums, date] = b.shift().split(',')
        const words = b.shift()

        this.setState({
            names,
            nums,
            words,
            date,
            data: b
        });
    }.bind(this)
  }

  onNameChange(e){
    this.setState({name:e.target.value})
  }

  render(){
    const {names} = this.state
    return (
      <Router>
        <div id='main-page'>
          <Switch>
            <Route exact path='/studyReport'><Redirect to='/studyReport/week'/></Route>
            <Route exact path='/studyReport/month'><Month {...this.state}/></Route>
            <Route exact path='/studyReport/week'><Week {...this.state}/></Route>
          </Switch>
        </div>
        <div id='options'>
          <NavLink activeClassName="selected" to='/studyReport/week' style={{marginRight:20}}>周学习报告</NavLink>
          <NavLink activeClassName="selected" to='/studyReport/month'>月学习报告</NavLink>
          <input style={{marginTop:30,display:'block'}} type="file" id="file" onChange={this.my_fileReader.bind(this)}/>
          <div>
            <select style={{marginTop:10}} onChange={this.onNameChange.bind(this)}>
                <option>请选择学生姓名</option>
                {names&&names.map((v,i)=><option key={i}>{v}</option>)}
            </select>
          </div>
          <Switch>
            <Route path='/studyReport/month'>
              <p style={{fontSize:14}}>请输入评语:</p>
              <textarea value={this.state.comment} onChange={(e)=>{this.setState({comment:e.target.value})}}></textarea>
              <div><button style={{marginTop:10}} onClick={()=>this.click()}>保存周学习报告</button></div>
            </Route>
            <Route path='/studyReport/week'>
              <div><button style={{marginTop:10}} onClick={()=>this.click()}>保存周学习报告</button></div>
            </Route>
          </Switch>
          
        </div>
        
      </Router>
    )
  }
}

export default App;
