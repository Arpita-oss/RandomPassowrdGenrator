import React, { useCallback, useDeferredValue, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState("");
  const [charAllowed, setCharAllowed] = useState("");
  const [password, setPassword] = useState("");

  const passwordref = useRef(null);

  const passwordGenerator = useCallback(()=>{  //logic for password generator
    let pass = "";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   if(numberAllowed) str += "0123456789";
   if(charAllowed) str += "!@#$%^&*()";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()*(str.length+1))
      pass += str.charAt(char)
      
    }
    setPassword(pass);
  },[length,charAllowed,numberAllowed,setPassword]) //in sab m koi bhi chedh chadh ho to optimise krdo

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numberAllowed])  //in sab m koi bhi chedh chadh ho to rerender krdoo , Mounting & Unmounting

  return (
    <div className='w-[100%] h-[100vh] bg-black flex justify-center items-center'>
      <div className='w-[60%] h-[20vh] bg-gray-500 rounded-lg'>
        <h1 className='text-xl text-center font-bold text-gray'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-0 ml-2 mr-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full h-[40px] py-1 px-3 mt-5 text-bold'
          placeholder='Password'
          readOnly 
          ref = {passwordref}/>
          <button onClick={copyPasswordToClipBoard}  className='bg-blue-500 w-[100px] h-[40px] mt-5'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer mt-8'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label className='text-white mt-8' >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
           <input type="checkbox" 
           defaultChecked={numberAllowed}
           className='mt-8 ml-6 cursor-pointer '
           name="" 
           id="numberInput"
           onChange={()=>setNumberAllowed((prev)=>!prev)}
            /> 
            <label className='text-white mt-8' >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
           <input type="checkbox" 
           defaultChecked={charAllowed}
           className='mt-8 ml-6 cursor-pointer'
           name="" 
           id="numberInput"
           onChange={()=>setCharAllowed((prev)=>!prev)}
            /> 
            <label className='text-white mt-8' >Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
