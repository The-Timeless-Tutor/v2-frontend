import PropTypes from 'prop-types';
import 'remixicon/fonts/remixicon.css';

// ----------------------------------------------------------------------

export default function ChatHeaderCompose({ selectedRoom, username }) {
  // web rtc
  const redirectToJoinPage = () => {
    if (selectedRoom)
      window.location.href =
        'https://call.thetimelesstutor.com/join/' +
        selectedRoom +
        '?name=' +
        username +
        '&video=0&notify=0';
  };
  const redirectToJoinPageWithVideo = () => {
    if (selectedRoom)
      window.location.href =
        'https://call.thetimelesstutor.com/join/' +
        selectedRoom +
        '?name=' +
        username +
        '&notify=0';
  };

  return (
    <div className="flex w-full items-center justify-between">
      {selectedRoom === '' && (
        <div className="animate-pulse flex items-center space-x-4">
          <div className="rounded-lg bg-slate-200 h-10 w-10"></div>
          <div className="h-5 w-40 bg-slate-200 rounded col-span-2"></div>
        </div>
      )}
      {selectedRoom && (
        <div className="flex items-center gap-3">
          <p className="px-4 py-2 bg-gray-100">{selectedRoom.substring(0, 1)}</p>
          <div className="text-sm font-medium">{selectedRoom}</div>
        </div>
      )}

      <div className="px-5 flex items-center text-xl gap-3">
        <i className="ri-phone-fill cursor-pointer" onClick={() => redirectToJoinPage()}></i>
        <i
          className="ri-vidicon-fill cursor-pointer "
          onClick={() => redirectToJoinPageWithVideo()}
        ></i>
      </div>
    </div>
  );
}

ChatHeaderCompose.propTypes = {
  contacts: PropTypes.array,
  onAddRecipients: PropTypes.func
};
