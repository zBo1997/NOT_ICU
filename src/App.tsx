
import './App.css'

import { ThemeProvider } from "@/components/theme-provider"
import { ResizableCom } from '@/components/resize-handle'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ResizableCom />
      </ThemeProvider >
    </>
  )
}

export default App
