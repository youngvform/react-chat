import React, { Component } from 'react';
import MessageContainer from 'containers/chat/MessageContainer'
import InputContainer from 'containers/chat/InputContainer'
import PageTemplate from 'components/common/PageTemplate';

class ChatRoomPage extends Component {

  render() {

    return (
      <PageTemplate disabled>
        <MessageContainer/>
        <InputContainer/>
      </PageTemplate>
      
    );
  }
}

export default ChatRoomPage;