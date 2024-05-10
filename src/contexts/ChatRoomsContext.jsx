import { createContext, useState } from 'react';

export const ChatRoomsContext = createContext();

export default function ChatRoomDataProvider({ children }) {
  const [selectedRoom, setSelectedRoom] = useState('')

  return (
    <ChatRoomsContext.Provider value={{ selectedRoom, setSelectedRoom }}>
      {children}
    </ChatRoomsContext.Provider>
  );
}
