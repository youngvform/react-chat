import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from 'components/chat/Input';
import * as chatActions from 'store/modules/chat';
import * as messageActions from 'store/modules/message';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.socket = io('localhost:4000');
  }
  handleClick = async () => {
    const { MessageActions, inputMessage: message, messages:oldMessage, match, ChatActions } = this.props;

    try {
      const { id, userId:sender } = match.params;
      const order = oldMessage.size + 1;
      const messages = {
        message, order, sender
      }
      const data = {id, messages}
      await MessageActions.send(data);
      const name = 'inputMessage';
      const value = '';
      ChatActions.changeInput({name, value});
      this.socket.emit('SEND_MESSAGE', {});
    } catch(e) {
      console.log(e);
    }
  }

  handleChangeInput = ({ name, value }) => {
    const { ChatActions } = this.props;
    ChatActions.changeInput({name, value});
  }

  render(){

    const { inputMessage } = this.props;
    const { handleClick, handleChangeInput } = this;

    return(
      <Input
        inputMessage={inputMessage}
        onClick={handleClick}
        onChangeInput={handleChangeInput}
      />
    );
  }
  
}

export default connect(
  (state) => ({
    inputMessage: state.chat.get('inputMessage'),
    messages: state.message.get('messages'),
  }),
  (dispatch) => ({
    ChatActions : bindActionCreators(chatActions, dispatch),
    MessageActions : bindActionCreators(messageActions, dispatch),
  })
)(withRouter(InputContainer));