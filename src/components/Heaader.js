import React from 'react'
import logo from '../assets/logo.jpg'
import style from '../styles/Header.module.scss'
function Header(props){
    const {nums='未上传', name='未选择', date='未上传'} = props
    
    return (
        <div className={style.nav}>
          <img alt='' src={logo}/>
          <div>
              <h1>达内童程月学习报告</h1>
              <div>
                <span>姓名：<span>{name}</span></span>
                <span>课次：<span>{nums}</span></span>
                <span>日期：<span>{date}</span></span>
              </div>
          </div>
        </div>
    )
}

export default Header