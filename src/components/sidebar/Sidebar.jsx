import React, { useState , useContext} from 'react'
import './Sidebar.css';
import { Context } from '../../context/Context';
import {assets} from '../../assets/assets'
function Sidebar() {

    const [extended,setExtended]=useState(false)
    const {onSent,previousPrompt,setRecentPrompt,newChat}=useContext(Context)
    const loadPrompt=async (prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
    <div className='sidebar'>
      <div className='top'>
        <img onClick={()=>setExtended(prev=>!prev)} src={assets.menu_icon} alt="menu" className='menu'/>
        <div className='newchat' onClick={()=>newChat()}>
            <img src={assets.plus_icon} alt="plus" className='plus'/>
            {extended&&<p>New Chat</p>}
        </div>
        {
        extended && 
            <div className='recent'>
                <p className='recent-title'>Recent</p>
                {
                    previousPrompt.map((item,index)=>{
                        return (
                            <div className='recent-entry' onClick={()=>loadPrompt(item)}>
                                <img src={assets.message_icon} alt="history" className='history'/>
                                <p>{item.slice(0,18)}...</p>
                            </div>
                            )
                    })
                }
            </div>
            }
      </div>

      <div className='bottom'>
            <div className='bottom-item recent-entry'>
                <img src={assets.question_icon} alt="question" className='question'/>
                {extended&&<p>Help</p>}
            </div>
            <div className='bottom-item recent-entry'>
                <img src={assets.history_icon} alt="activity" className='activity'/>
                {extended&&<p>Activity</p>}
            </div>
            <div className='bottom-item recent-entry'>
                <img src={assets.setting_icon} alt="setting" className='setting'/>
                {extended&&<p>Settings</p>}
            </div>
      </div>
      </div>
  )
}

export default Sidebar
