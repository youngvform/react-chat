import React, { Component } from 'react';
import ChatList from 'components/chat/ChatList'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';
import * as chatActions from 'store/modules/chat';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import shortId from 'shortid';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.socket = io('localhost:4000');
    this.socket.on('GET_CHAT_LIST', (data)=>{
      this.getChatList();
    })
  }
  getChatList = () => {
    const { ListActions, userId, ChatActions } = this.props;
    if (!userId) {
      const initialUserId = shortId.generate();
      ChatActions.initializeUserId(initialUserId);
    }
    ListActions.getChatList();
  }

  handleChangeInput = ({ name, value }) => {
    const { ChatActions } = this.props;
    ChatActions.changeInput({name, value});
  }

  handleChatCreate = async () => {
    const { ChatActions, title, user, BaseActions, history, userId } = this.props;
    if(!title || !user) {
      BaseActions.isError(true);
      return;
    }
    const userIds = [userId];
    const chat = { title, user, userIds };

    try {
      await ChatActions.create(chat);
      ChatActions.updateUserIds(userIds);
      ChatActions.showCreate(false);
      history.push(`/chatroom/${this.props.chatId}/${userId}`);
      this.socket.emit('CREATE_ROOM',{});
    } catch(e) {
      console.log(e);
    }
  }

  handleCreateCancel = () => {
    const { ChatActions } = this.props;
    ChatActions.showCreate(false);
  }

  handleEnter = async ({ id, oldUserIds }) => {
    const { ChatActions, history, userId } = this.props;
    if (!id) {
      alert('check chatId');
      return;
    }

    try {
      
      const userIds = oldUserIds.concat(userId);
      await ChatActions.enter({id, userIds});
      ChatActions.updateUserIds(userIds);
      history.push(`/chatroom/${id}/${userId}`);

    } catch(e) {
      console.log(e);
    }

  }

  componentDidMount() {
    this.getChatList();
    const { BaseActions } = this.props;
    BaseActions.isChat(true);

  }

  render() {
    const { chats, loading, showCreate, title, user, isError } = this.props;
    const { handleChangeInput, handleChatCreate, handleCreateCancel, handleEnter } = this;
    if (loading) return null;
    if (showCreate) {
      return (
        <ChatList 
          chats={chats} 
          showCreate={showCreate} 
          title={title} 
          user={user}
          onChangeInput={handleChangeInput} 
          onChatCreate={handleChatCreate} 
          onCreateCancel={handleCreateCancel}
          onEnter={handleEnter}
          isError={isError}
        />
      ) ;     
    } else {
      return (
        <ChatList chats={chats} onEnter={handleEnter} />
      );
    }
  }
}

export default connect(
  (state) => ({
    chats: state.list.get('chats'),
    showCreate: state.chat.get('showCreate'),
    title: state.chat.get('title'),
    user: state.chat.get('user'),
    chatId: state.chat.get('chatId'),
    userId: state.chat.get('userId'),
    isError: state.base.get('isError'),
    loading: state.pender.pending['list/GET_CHAT_LIST']
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch),
    ChatActions: bindActionCreators(chatActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(ChatContainer));