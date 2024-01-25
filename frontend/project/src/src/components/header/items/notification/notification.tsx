import { Link } from "react-router-dom";
import { getNotificationDate } from "../../../../utils";
import { useState } from "react";

type NotificationProps = {
    notificationId: number,
    text: string,
    createdDate: string,
    isNotificationActive: boolean,
    OnNotificationClick: (id: number) => void,
  };

function Notification({notificationId, text, createdDate, isNotificationActive, OnNotificationClick}: NotificationProps): JSX.Element {
  const [isActive, setIsActive] = useState(isNotificationActive);
  return (
    <li className="main-nav__subitem" onClick={() => {
        setIsActive(false);
        OnNotificationClick(notificationId);
      }}>
      <Link to="#" className={`notification ${isActive ? 'is-active' : ''}`}>
        <p className="notification__text">{text}</p>
        <time className="notification__time" dateTime="2023-12-23 12:35">{getNotificationDate(createdDate)}</time>
      </Link>
    </li>
  )
};
export default Notification;
