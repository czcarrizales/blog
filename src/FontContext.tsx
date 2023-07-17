import React, {createContext, useState} from 'react'

interface FontContextValue {
    font: string,
    count: number,
    toggleFont: () => void;
    incrementCount: () => void;
}

export const FontContext = createContext<FontContextValue | undefined>(undefined)

export const FontProvider = ({children}) => {
    const [font, setFont] = useState('arial')
    const [count, setCount] = useState(0)
    const toggleFont = () => {
        setFont((prevFont) => (prevFont === 'arial' ? 'helvetica' : 'arial'))
    }
    const incrementCount = () => {
        setCount(count + 1)
    }
  return (
        <FontContext.Provider value={{font, count, toggleFont, incrementCount}}>
            {children}
        </FontContext.Provider>
  )
}