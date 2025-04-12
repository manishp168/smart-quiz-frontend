import React from 'react'

export const Container = ({children}) => {
  return (
    <div
    className='bg-[#eaeaea]  min-h-screen w-full overflow-x-hidden pt-20' style={{ scrollbarWidth: "none" }}
    >{children}
    </div>
  )
}

