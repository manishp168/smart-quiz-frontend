import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Container = ({children}) => {
  const path = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  },[path])
  return (
    <div
    className='bg-[#eaeaea]  min-h-screen w-full overflow-x-hidden pt-20' style={{ scrollbarWidth: "none" }}
    >{children}
    </div>
  )
}

