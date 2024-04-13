import React, {useMemo, useContext} from 'react'
import {io} from 'socket.io-client'

const SocketContext = React.createContext(null)

export const SocketProvider = ({children}) => {
  const socket = useMemo(() => io('http://localhost:8002'), [])
  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  )
}

export const UseSocket = () => useContext(SocketContext)
