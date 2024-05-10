import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useLightBox } from '@/components/lightbox';
import Lightbox from '@/components/lightbox/lightbox';
import { useRef, useEffect, useState } from 'react';
import useMessage from '@/hooks/useMessage';
import useUser from '@/hooks/useUser';

export default function ChatMessageList({ selectedRoom }) {
  const { messages } = useMessage(selectedRoom || '');
  const user = useUser();

  const slides = messages
    .filter((message) => message.type === 'image')
    .map((message) => ({ src: message.content, alt: 'Image Message' }));

  const lightbox = useLightBox(slides);
  const messageContainerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    if (!isUserScrolling) {
      scrollToBottom();
    }
  }, [messages, isUserScrolling]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
    setIsUserScrolling(scrollTop + clientHeight !== scrollHeight);
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  return (
    <div
      ref={messageContainerRef}
      className="flex flex-col overflow-y-scroll h-[100%]"
      onScroll={handleScroll}
    >
      <div className="min-h-[90%] px-5 py-2">
        <Box className="overflow-y-scroll">
          {messages.length > 0 ? (
            messages.reverse().map((message) => (
              <ul
                key={message.id}
                className={`flex flex-col flex-end ${
                  message.user === user.user.username ? 'items-end' : 'items-start'
                }`}
              >
                {message.type !== 'deleted' && (
                  <li
                    className={`flex items-start gap-3 ${
                      message.user === user.user.username && 'flex-row-reverse'
                    }`}
                  >
                    <p className="w-10 h-10 p-2 mt-2 text-center bg-[#E9EFF9] rounded-full">
                      {message.user.slice(0, 1).toUpperCase()}
                    </p>
                    {message.content.startsWith('http') ? (
                      <img className="my-2 w-[20vw] rounded-lg" src={message.content} alt="Message" />
                    ) : (
                      <div
                        className={`my-2 max-w-[30vw] ${
                          message.user === user.user.username
                            ? 'rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-[#1877F2] text-white'
                            : 'rounded-tl-xl rounded-tr-xl rounded-br-xl bg-[#F1F2F4]'
                        } py-2 px-4 text-sm`}
                      >
                        {message.content}
                      </div>
                    )}
                  </li>
                )}
              </ul>
            ))
          ) : (
            // Render placeholder messages if no messages
            [0, 1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="animate-pulse flex gap-3 items-start py-2">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="rounded-tl-xl rounded-tr-xl rounded-br-xl bg-[#F1F2F4] py-2 px-4 h-[60px] w-[30%]"></div>
              </div>
            ))
          )}
        </Box>
      </div>
      <Lightbox
        className="flex-1"
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </div>
  );
}

ChatMessageList.propTypes = {
  selectedRoom: PropTypes.string.isRequired,
};
