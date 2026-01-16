import { useCallback, useEffect, useRef, useState } from "react"

const App=()=>{
  const[length,setLength]=useState(8)
  const[numAllowed,setNumAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState('')

  const submitHandler=(e)=>{
    e.preventDefault()
  }

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz"

    if(numAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%^&*'

    for (let i = 1; i < length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
    
  },[length,numAllowed,charAllowed])

  const passwordRef=useRef(null)
  const copyPassword=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])

  return(
    <div className="w-full h-screen bg-zinc-950 text-white flex justify-center items-center">
      <form className="w-[30%] h-45 bg-zinc-700 rounded-2xl" onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <div className="w-full h-1/2 px-12 py-4">
          <input type="text" placeholder="Password" className="w-100 bg-zinc-100 text-black rounded-2xl p-2" value={password} readOnly ref={passwordRef}/>
          <button className="bg-blue-600 text-white px-[5%] py-[2%] -mx-4 rounded-xl rounded-l-none" onClick={copyPassword}>Copy</button>
        </div>
        <div className="flex justify-around">
          <div>
            <input type="range" min="0" max="100" value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label>length: {length}</label>
          </div>

          <div className="flex gap-4">
            <div className="flex gap-2">
              <input type="checkbox" defaultChecked={numAllowed} onChange={()=>{
                setNumAllowed(prev=>!prev)
              }}/>
              <h2>Numbers</h2>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{
                setCharAllowed(prev=>!prev)
              }}/>
              <h2>Characters</h2>
            </div>
          </div>
        </div>
        
        
      </form>
    </div>
  )
}

export default App