import { createContext, useReducer } from 'react';

export const ChatRoomsContext = createContext();

const initialState = {
  chatRoomData: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHAT_ROOM_DATA':
      return {
        ...state,
        chatRoomData: action.payload
      };
    default:
      return state;
  }
};

export default function ChatRoomDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setChatRoomData = (data) => {
    dispatch({
      type: 'SET_CHAT_ROOM_DATA',
      payload: data
    });
  };

  return (
    <ChatRoomsContext.Provider value={{ chatRoomData: state.chatRoomData, setChatRoomData }}>
      {children}
    </ChatRoomsContext.Provider>
  );
}
