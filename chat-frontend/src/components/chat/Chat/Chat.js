import React from 'react';
import styles from './Chat.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Chat = ({ title, user, id, userIds: oldUserIds, onEnter })=> {
  const handleClick = () => {
    onEnter({id, oldUserIds});
  }
  return (
    <div className={cx('chat')}>
      <div className={cx('chat-contents')} onClick={handleClick}>
        <div className={cx('title')}>
          {title}
        </div>
        <div className={cx('user')}>
          {user}
        </div>
      </div>
    </div>
  );
}

export default Chat;