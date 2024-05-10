import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Scrollbar from 'src/components/scrollbar';
import { useLightBox } from '@/components/lightbox';
import Lightbox from '@/components/lightbox/lightbox';

import { useMessagesScroll } from './hooks';
import ChatMessageItem from './chat-message-item';

import useMessage from '@/hooks/useMessage';

export default function ChatMessageList({ messages = [], participants }) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const message = useMessage('');

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const lightbox = useLightBox(slides);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              participants={participants}
              onOpenLightbox={() => lightbox.onOpen(message.body)}
            />
          ))}
        </Box>
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
  messages: PropTypes.array,
  participants: PropTypes.array
};
