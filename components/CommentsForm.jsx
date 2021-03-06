import React, {useState, useEffect, useRef} from 'react'
import { submitComment } from '../services'

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(null)
  const [localStorage, setlocalStorage] = useState(null)
  const [showSucessMessage, setshowSucessMessage] = useState(null)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')

  }, [])
  

  const handleCommentSubmission = () =>{
    setError(false)
    
    const { value: comment} = commentEl.current
    const { value: name} = nameEl.current
    const { value: email} = emailEl.current
    const { checked: storeData} = storeDataEl.current


    if(!comment || !name || !email){
      setError(true)
      return;
    }
    const commentObj = { name, email, comment, slug }

    if(storeData){
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    }else{
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj)
      .then((res)=>{
        setshowSucessMessage(true);
        setTimeout(() => {
          setshowSucessMessage(false);
        }, 3000);
      })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b border-yellow-700 border-opacity-40 pb-4'>Leave a Comment</h3>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <input 
          name="name"
          placeholder='Name'
          type={'text'} 
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-1 focus:ring-yellow-700 focus:ring-opacity-40 bg-yellow-700 bg-opacity-10 text-gray-700"
        />
         <input 
          name="email"
          placeholder='Email'
          type={'text'} 
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-1 focus:ring-yellow-700 focus:ring-opacity-40 bg-yellow-700 bg-opacity-10 text-gray-700"
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea  
          name='comment'
          placeholder='Comment...'
          ref={commentEl} 
          className="p-4 outline-none w-full rounded-lg focus:ring-1 focus:ring-yellow-700 focus:ring-opacity-40 bg-yellow-700 bg-opacity-10 text-gray-700"
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name='storeData' value={true}/>
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my email and name for the next time I comment</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required.</p>}
      <div className='mt-8'>
        <button
          type='button' 
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-yellow-700 inline-block bg-yellow-700 bg-opacity-40 text-lg rounded-2xl text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSucessMessage && <span className='text-lg float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}

      </div>
    </div>
  )
}

export default CommentsForm