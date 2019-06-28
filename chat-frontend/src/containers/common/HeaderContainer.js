import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as chatActions from 'store/modules/chat';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';

class HeaderContainer extends Component {
  handleClick = () => {
    const { ChatActions, isChat, userIds, match, history } = this.props;
    if (isChat) {
      ChatActions.showCreate(true);
    }
    else {
      const { id, userId } = match.params;
      if(userIds.size === 1) {
        ChatActions.remove(id);
      } else {
        ChatActions.exit({id, userId});
      }
      history.push('/');
      
    }
  }

  handleExit = ({ userId }) => {
    const { ChatActions } = this.props;
    ChatActions.exit({userId});
  }

  render() {
    const { isChat, disabled } = this.props;
    const { handleClick } = this;
    return(
      <Header onClick={handleClick} isChat={isChat} disabled={disabled}/>
    );
  }
}

export default connect(
  (state) => ({
    isChat: state.base.get('isChat'),
    chatId: state.chat.get('chatId'),
    userId: state.chat.get('userId'),
    userIds: state.chat.get('userIds'),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ChatActions: bindActionCreators(chatActions, dispatch),
  })

)(withRouter(HeaderContainer));