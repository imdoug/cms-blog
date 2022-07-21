import React, { useState, useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services'

const Comments = ({slug}) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug)
      .then((result)=>setComments(result))
  }, [])
  
  return (
    <>
      {comments.length > 0 &&  <>
      {/* <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'> */}
        <h3 className='te4xt-xl mb-4 ml-8 mt-10 text-yellow-700 text-opacity-40  font-semibold pb-4'>
          {comments.length}
          {' '}
          Comments
        </h3>
        {comments.map((comment) =>(
          <div className='bg-white shadow-lg rounded-lg p-8 pb-2 mb-8'>
          <div key={comment.createdAt} className=" mb-4 pb-4">
            <p className='mb-4'>
              <span className='font-semibold'>
                {comment.name}
              </span>
              {' '}
              on
              {' '}
              {moment(comment.createdAt).format('MMM DD, YYYY')}
            </p>
            <p className='whitespace-pre-line text-gray-6000 w-full'>
              {parse(comment.comment)}
            </p>
          </div>
          </div>
        ))}
      {/* </div> */}
      </>}
    </>
  )
}

export default Comments