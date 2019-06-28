import React, { Component } from 'react';
import styles from './Message.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Message extends Component {


  render() {
    const { myMsg, children } = this.props;

    return (
      <div className={cx('message', { myMsg })}>
        {children}
      </div>
    );
  }
}

export default Message;