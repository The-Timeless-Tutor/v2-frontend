import { sub } from 'date-fns';
import PropTypes from 'prop-types';
import { useRef, useMemo, useState, useCallback, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { paths } from '@/routes/path';

import { useRouter } from 'src/routes/hooks';

import { useMockedUser } from '@/hooks/use-mocked-user';

import { sendMessage, createConversation } from '@/api/chat';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ChatMessageInput({
  selectedRoom,
  recipients,
  onAddRecipients,
  selectedConversationId
}) {
  const router = useRouter();
  const { user } = useMockedUser();
  const fileRef = useRef(null);
  const [message, setMessage] = useState('');

  const myContact = useMemo(
    () => ({
      id: `${user?.id}`,
      role: `${user?.role}`,
      email: `${user?.email}`,
      address: `${user?.address}`,
      name: `${user?.displayName}`,
      lastActivity: new Date(),
      avatarUrl: `${user?.photoURL}`,
      phoneNumber: `${user?.phoneNumber}`,
      status: 'online'
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: 1,
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: myContact.id
    }),
    [message, myContact.id]
  );

  const conversationData = useMemo(
    () => ({
      id: 1,
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0
    }),
    [messageData, myContact, recipients]
  );

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  return (
    <>
      <InputBase
        value={message}
        onChange={handleChangeMessage}
        placeholder="Message..."
        startAdornment={
          <IconButton onClick={handleAttach}>
            <Iconify icon="solar:gallery-add-bold" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  onAddRecipients: PropTypes.func,
  recipients: PropTypes.array,
  selectedConversationId: PropTypes.string
};
