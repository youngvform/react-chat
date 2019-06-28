import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageList from 'components/chat/MessageList';
import * as baseActions from 'store/modules/base';
import * as messageActions from 'store/modules/message';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.socket = io('localhost:4000');
    this.socket.on('RECEIVE_MESSAGE', (data)=>{
      this.receiveMessage();
    })
  }

  receiveMessage = () => {
    const { MessageActions, match } = this.props;
    const { id } = match.params;
    MessageActions.receive(id);
  }
  componentDidMount() {
    const { BaseActions } = this.props;
    BaseActions.isChat(false);
    this.receiveMessage();
    this.MessageList.scrollBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.messages !== this.props.messages) {
      this.MessageList.scrollBottom();
    }
  }

  render() {
    const { messages, match } = this.props;
    const { userId } = match.params;

    return (
      <MessageList
        messages={messages}
        userId={userId}
        ref={(ref) => this.MessageList = ref}
      />
    );
  }
}

export default connect(
  (state) => ({
    messages: state.message.get('messages'),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    MessageActions: bindActionCreators(messageActions, dispatch),
  })
)(withRouter(MessageContainer));