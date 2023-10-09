import React, { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

const useLocalStorage = (key, initial = null) => {
  const [value, setValue] = useState(() => {
    if (isBrowser) {
      const saved = window.localStorage.getItem(key)
      if (saved !== null) {
        return JSON.parse(saved)
      }
    }
    return initial
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export default useLocalStorage

//In summary, the useLocalStorage custom hook allows you to store and synchronize a value in local storage and provides a way to interact with it in React components. It checks if the code is running in a browser, retrieves the initial value from local storage (if available), and keeps local storage updated as the value changes in your component.
