import React, { useState } from 'react'

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const languages = [
    'English',
    'Español',
    'Français',
    'Deutsch',
    'Italiano',
    'Português',
    'Русский',
    '中文',
    '日本語',
    '한국어'
  ]

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="text-sm">{selectedLanguage}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedLanguage === language ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
