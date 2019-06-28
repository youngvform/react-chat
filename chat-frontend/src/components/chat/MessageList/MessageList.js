import React, { Component } from 'react';
import styles from './MessageList.scss';
import classNames from 'classnames/bind';
import PageTemplate from 'components/common/PageTemplate';
import Message from 'components/chat/Message';
import Input from 'components/chat/Input';

const cx = classNames.bind(styles);

class MessageList extends Component {

  scrollBottom = () => {
    const { scrollHeight } = this.messageBox;
    this.messageBox.scrollTop = scrollHeight;
  }

  render() {
    const { messages, userId } = this.props;
    const messageList = messages.map(
      (messageOne) => {
        const { order, sender, date, message } = messageOne.toJS();
        let myMsg = false;
        if(userId === sender) {
          myMsg = true;
        }
        return <Message key={date} order={order} sender={sender} date={date} myMsg={myMsg}>{message}</Message>;
      }
    );

    return(
      <div 
        className={cx('message-list')}
        ref={(ref) => this.messageBox = ref }
      >
        {messageList}
      </div>
    )
  }
}

export default MessageList;
