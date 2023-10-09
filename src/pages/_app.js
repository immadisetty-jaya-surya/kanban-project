import { BoardProvider } from '@/context'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <BoardProvider>
        <Component {...pageProps} />
      </BoardProvider>
    </ThemeProvider>
  )
}
