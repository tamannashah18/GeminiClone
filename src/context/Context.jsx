import { createContext ,useState} from "react"
import run from "../config/gemini"
export const Context=createContext()
const ContextProvider=(props)=>{
    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [previousPrompt,setPreviousPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");

    const delayPara=(index,nextWord)=>{
        setTimeout(()=>{
            setResultData(prev=>prev+nextWord);
        },75*index);
    }
    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }
    const onSent=async (prompt="")=>{
        setResultData('');
        setLoading(true);
        setShowResult(true);
        let response="";
        if(prompt!==""){
            response=await run(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPreviousPrompt(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await run(input);
        }
        // const response=await run(input);
        let responseArray=response.split("**");
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i%2===0 ||i===0){
                newResponse+=responseArray[i];
            }
            else{
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
        } 
        let newResponse2=newResponse.split("*").join("</br>");
        
        let newResponseArray=newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            delayPara(i,newResponseArray[i]+" ");
        }
        setLoading(false);
        setInput("");
        // setRecentPrompt(prompt);
        // setPreviousPrompt([...previousPrompt,prompt]);
    }

    // onSent("what is react js");
    const contextValue=
    {
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
        setResultData,
        newChat
    }
    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
}
export default ContextProvider
