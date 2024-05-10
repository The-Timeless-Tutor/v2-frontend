import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Scrollbar from 'src/components/scrollbar';
import { useLightBox } from '@/components/lightbox';
import Lightbox from '@/components/lightbox/lightbox';
import { useMessagesScroll } from './hooks';
import ChatMessageItem from './chat-message-item';
import { ChatRoomsContext } from '@/contexts/ChatRoomsContext';
import { useContext } from 'react';
import { Typography } from '@mui/material';

export default function ChatMessageList({ messages = [], participants, user }) {
  // Custom hook to scroll to the end of messages
  const { messagesEndRef } = useMessagesScroll(messages);

  // Handling messages that are images for the lightbox
  const slides = messages
    .filter((message) => message.type === 'image') // Assuming 'image' type messages need to be handled
    .map((message) => ({ src: message.content, alt: 'Image Message' })); // Using 'content' as image source

  // Lightbox setup
  const lightbox = useLightBox(slides);

  const { chatRoomData } = useContext(ChatRoomsContext);
  console.log(chatRoomData);
  console.log('user:', user);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: '100%', overflowY: 'auto' }}>
        <Box>{chatRoomData?.map((message) => message.content)}</Box>
      </Scrollbar>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

ChatMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  participants: PropTypes.array
};
