import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_CHAT_LIST = 'list/GET_CHAT_LIST';

// action creators
export const getChatList = createAction(GET_CHAT_LIST, api.getChatList);

// initial State
const initailState = Map({
  chats: List(),
});

export default handleActions({
  ...pender({
    type: GET_CHAT_LIST,
    onSuccess: (state, action) => {
      const { data: chats } = action.payload;

      return state.set('chats', fromJS(chats));
    }
  })
}, initailState);
