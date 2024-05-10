import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import useUser from '@/hooks/useUser';

export default function ChatNavAccount() {
  const { user } = useUser();

  const popover = usePopover();

  const [status, setStatus] = useState('online');

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value);
  }, []);

  // Function to determine badge color based on status
  const getBadgeColor = (status) => {
    switch (status) {
      case 'online':
        return 'green';
      case 'busy':
        return 'red';
      case 'offline':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent=" "
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: getBadgeColor(status),
            width: 18,
            height: 18,
            borderRadius: '50%'
          }
        }}
      >
        <Avatar
          src={user?.image}
          alt={user?.username}
          onClick={popover.onOpen}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="top-left" sx={{ p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5
          }}
        >
          <ListItemText
            primary={user?.username}
            secondary={user?.email}
            secondaryTypographyProps={{ component: 'span' }}
          />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem>
            <Iconify icon="eva:checkmark-fill" width={24} />

            <Select
              native
              fullWidth
              value={status}
              onChange={handleChangeStatus}
              input={<InputBase sx={{ pl: 0, pr: 2 }} />}
              inputProps={{
                sx: { textTransform: 'capitalize' }
              }}
            >
              {['online', 'busy', 'offline'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </MenuItem>

          <MenuItem>
            <Iconify icon="solar:user-id-bold" width={24} />
            Profile
          </MenuItem>

          <MenuItem>
            <Iconify icon="eva:settings-2-fill" width={24} />
            Settings
          </MenuItem>
        </Stack>
      </CustomPopover>
    </>
  );
}
