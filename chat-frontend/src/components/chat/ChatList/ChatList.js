import React, { Component } from 'react';
import styles from './ChatList.scss';
import classNames from 'classnames/bind';
import Chat from 'components/chat/Chat';
import CreateArea from 'components/chat/CreateArea';

const cx = classNames.bind(styles);

class ChatList extends Component {


  render() {
    const { chats, showCreate, title, user, onChangeInput, onChatCreate, onCreateCancel, onEnter, isError } = this.props;

    let chatList = chats.map(
      (chat) => {
        const { _id, title, user, userIds } = chat.toJS();
        return <Chat key={_id} id={_id} title={title} user={user} userIds={userIds} onEnter={onEnter} />;
      }
    );

    if (showCreate) {
      const createArea = <CreateArea 
                            key="create-area" 
                            title={title} 
                            user={user} 
                            onChangeInput={onChangeInput} 
                            onChatCreate={onChatCreate} 
                            onCreateCancel={onCreateCancel}
                            isError={isError}  
                          />
      chatList = [createArea, ...chatList];
    }

    return (
      <div className={cx('chat-list')}>
        {chatList}
      </div>
    )
  }
}

export default ChatList;