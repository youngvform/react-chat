import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ChatContainer from 'containers/chat/ChatContainer';

class MainPage extends Component {

  render() {
    return (
      <PageTemplate>
        <ChatContainer />
      </PageTemplate>
    )
  }
}

export default MainPage;