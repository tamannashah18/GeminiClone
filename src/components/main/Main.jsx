import React, { useContext } from 'react'
import './Main.css'
import {Context} from '../../context/Context'
import { assets } from '../../assets/assets'
function Main() {

    const {
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        previousPrompt,
        setPreviousPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData
    }=useContext(Context)

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="search" />
      </div>
      <div className='main-container'>
        {
            !showResult?
            <>
            <div className="greet">
                <p><span>Hello,</span></p>
                <p>How can I help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest itenary for a road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Plan brainstorming team activities</p>
                    <img src={assets.bulb_icon} alt="" />
                </div><div className="card">
                    <p>Type a draft email</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Code me a e-commerce website</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :
            <div className="result">
                <div className="resultTitle">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="resultData">
                    <img src={assets.gemini_icon} alt="" />
                    {
                        loading?
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>
            </div>
        }
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={e=>setInput(e.target.value)} value={input} type="text" placeholder='Search' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {input!='' && <img onClick={()=>onSent()} src={assets.send_icon} alt="" />}
                </div>
            </div>
            <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its</p>
        </div>
      </div>
    </div>
  )
}
export default Main
