import { Helmet } from 'react-helmet-async';

import { CreateRoomView } from '@/sections/rooms/view';

export default function CreateRoomPage() {
  return (
    <>
      <Helmet>
        <title> Create new room | The Timeless Tutor </title>
      </Helmet>

      <CreateRoomView />
    </>
  );
}
