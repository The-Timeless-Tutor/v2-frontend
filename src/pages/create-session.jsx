import { Helmet } from 'react-helmet-async';

import { CreateSessionView } from '@/sections/rooms/view';

export default function CreateRoomPage() {
  return (
    <>
      <Helmet>
        <title> Create new session | The Timeless Tutor </title>
      </Helmet>

      <CreateSessionView />
    </>
  );
}
