import React, { useState } from 'react';

const NotificationWidget = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((v) => !v);

  return (
    <div className={"notif-widget" + (open ? " open" : "") }>
      <button className="notif-toggle" onClick={toggleOpen}>
        Notications
      </button>
      {open && (
        <div className="notif-panel">
          <div className="notif-header">Notifications</div>
          {/* <div className="notif-list">
            <div className="notif-item">Welcome to Auction Bharat!</div>
            <div className="notif-item">Your bid has been placed.</div>
            <div className="notif-item">New item added to marketplace.</div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default NotificationWidget;
