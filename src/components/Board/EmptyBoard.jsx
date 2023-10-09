import React from 'react'
import Button from '../shared/Button'

const EmptyBoard = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-lightGrey dark:bg-veryDarkGrey">
      <h2 className="heading-lg text-mediumGrey text-center">
        This board is empty. create a new column to get started.
      </h2>
      <Button className="btn btn__primary btn-lg mt-6">+ add new column</Button>
    </div>
  )
}

export default EmptyBoard
