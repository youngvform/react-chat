import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const SEND = 'chat/SEND';
const RECEIVE = 'chat/RECEIVE';

// action creators
export const send = createAction(SEND, api.send);
export const receive = createAction(RECEIVE, api.receive);

// initial State
const initailState = Map({
  messages: List(),
});

export default handleActions({
  ...pender({
    type: SEND,
    onSuccess: (state, action) => {
      const { messages } = action.payload.data;
      console.log(messages);
      return state.set('messages', fromJS(messages));
    }
  }),
  ...pender({
    type: RECEIVE,
    onSuccess: (state, action) => {
      const { messages } = action.payload.data;
      return state.set('messages', fromJS(messages));
    }
  }),

}, initailState);
