import React from 'react'

const NoBoardsFound = () => {
  return (
    <div className=" flex flex-col justify-center items-center w-full h-full bg-lightGrey dark:bg-veryDarkGrey">
      <h2 className="heading-lg text-mediumGrey text-center">
        <button className="btn btn__primary btn-lg mt-6">create a board</button>
      </h2>
    </div>
  )
}

export default NoBoardsFound
