import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return (
    <div>
      <Image
        src="/icon-light-theme.svg"
        alt="Sun"
        height={18}
        width={18}
        onClick={() => setTheme('light')}
      />
      <h5>light</h5>
      <label
        htmlFor="default-toggle"
        className="w-16 inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          id="default-toggle"
          className="sr-only peer"
          onChange={() => setTheme(theme === 'light' ? 'light' : 'dark')}
          checked={theme === 'light'}
        />
        <div className="w-10 h-5 bg-mainPurpleHover rounded-full peer peer-checked:after:translate-x-5 dark:bg-mainPurpleHover  peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-mainPurple"></div>
      </label>
      <h5>dark-moon</h5>
      <Image
        src="/icon-dark-theme.svg"
        alt="Moon"
        height={15}
        width={15}
        onClick={() => setTheme('dark')}
      />
    </div>
  )
}

export default ThemeToggle