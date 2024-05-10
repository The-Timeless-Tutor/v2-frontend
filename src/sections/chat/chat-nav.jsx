import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { paths } from '@/routes/path';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useCollapseNav } from './hooks';
import { ChatNavItemSkeleton } from './chat-skeleton';
import useRoom from '@/hooks/useRoom';
import useUser from '@/hooks/useUser';

const NAV_WIDTH = 320;
const NAV_COLLAPSE_WIDTH = 96;

export default function ChatNav({ setSelectedRoom }) {
  const theme = useTheme();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');

  const { user } = useUser();
  const { room: rooms = [], isLoading: isRoomLoading, isError: isRoomError } = useRoom(user.email);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => room.toLowerCase().includes(searchQuery));
  }, [rooms, searchQuery]);

  const handleSearchRooms = useCallback((event) => {
    const query = event.target.value;
    setSearchQuery(query.toLowerCase());
  }, []);

  const renderSearchInput = (
    <ClickAwayListener onClickAway={() => setSearchQuery('')}>
      <input
        className="text-sm w-full p-2 border mt-2"
        fullWidth
        value={searchQuery}
        sdfcds
        onChange={handleSearchRooms}
        placeholder="🛎️ Search Rooms..."
      />
    </ClickAwayListener>
  );

  const {
    collapseDesktop,
    onCloseDesktop,
    onCollapseDesktop,
    openMobile,
    onOpenMobile,
    onCloseMobile
  } = useCollapseNav();

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, mdUp]);

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop();
    } else {
      onCloseMobile();
    }
  }, [mdUp, onCloseMobile, onCollapseDesktop]);

  const handleClickCompose = useCallback(() => {
    if (!mdUp) {
      onCloseMobile();
    }
    router.push(paths.dashboard.chat);
  }, [mdUp, onCloseMobile, router]);

  const renderContent = (
    <>
      <Stack direction="row" alignItems="start" justifyContent="start" sx={{ p: 2.5, pb: 0 }}>
        <IconButton onClick={handleToggleNav}>
          <Iconify
            icon={collapseDesktop ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
          />
        </IconButton>

        {!collapseDesktop && (
          <IconButton onClick={handleClickCompose}>
            <Iconify width={24} icon="solar:user-plus-bold" />
          </IconButton>
        )}
      </Stack>

      <Box sx={{ p: 2.5, pt: 0, pb: 0 }}>{!collapseDesktop && renderSearchInput}</Box>

      <Scrollbar sx={{ pb: 1 }}>
        {isRoomLoading && <ChatNavItemSkeleton count={5} />}
        {isRoomError && <Typography sx={{ mx: 2, my: 1 }}>Failed to load rooms</Typography>}
        {filteredRooms.length > 0 && (
          <div className="cursor-pointer">
            {filteredRooms.map((room, index) => (
              <div
                key={index}
                onClick={() => handleSelectRoom(room)}
                className="cursor-pointer mt-2 px-6 py-2 text-sm flex gap-3 items-center hover:bg-gray-100"
              >
                <p className="bg-gray-50 px-4 py-2 rounded-lg text-sm  font-medium">
                  {room.substring(0, 1)}
                </p>
                <p className="font-medium">{room}</p>
              </div>
            ))}
          </div>
        )}
      </Scrollbar>
    </>
  );

  return (
    <>
      {!mdUp && (
        <IconButton
          onClick={onOpenMobile}
          sx={{
            left: 0,
            top: 84,
            zIndex: 9,
            width: 32,
            height: 32,
            position: 'absolute',
            borderRadius: `0 12px 12px 0`,
            bgcolor: theme.palette.primary.main,
            boxShadow: theme.customShadows.primary,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              bgcolor: theme.palette.primary.darker
            }
          }}
        >
          <Iconify width={16} icon="solar:users-group-rounded-bold" />
        </IconButton>
      )}

      {mdUp ? (
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: NAV_WIDTH,
            borderRight: `solid 1px ${theme.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter
            }),
            ...(collapseDesktop && {
              width: NAV_COLLAPSE_WIDTH
            })
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openMobile}
          onClose={onCloseMobile}
          slotProps={{
            backdrop: { invisible: true }
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

ChatNav.propTypes = {
  contacts: PropTypes.array,
  conversations: PropTypes.object,
  loading: PropTypes.bool,
  selectedConversationId: PropTypes.string
};
