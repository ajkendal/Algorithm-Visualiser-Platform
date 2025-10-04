import React from 'react'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onClick={() => onToggle(theme === 'light' ? 'dark' : 'light')}
      className='relative p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary'
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className='relative w-6 h-6'>
        <span
          className={`absolute inset-0 transform transition-transform duration-300 ease-in-out rotate-90 opacity-0 dark:rotate-0 dark:opacity-100`}
        >
          <Sun className='w-6 h-6 text-yellow-500' />
        </span>
        <span
          className={`absolute inset-0 transform transition-transform duration-300 ease-in-out rotate-0 opacity-100 dark:-rotate-90 dark:opacity-0`}
        >
          <Moon className='w-6 h-6 text-yellow-400' />
        </span>
      </div>
    </button>
  )
}

export default ThemeToggle
