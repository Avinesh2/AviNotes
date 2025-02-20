import React from 'react'
import emptyImage from '../../assets/Empty.png';
const EmptyCard = ({message}) => {
  return (
    <div className='flex justify-center items-center flex-col mt-20'>
        <img src={emptyImage} alt="empty" className='w-80 h-80 max-w-full max-h-full object-contain'/>
    </div>
  )
}

export default EmptyCard