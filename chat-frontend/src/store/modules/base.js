import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

// action types
const IS_CHAT = 'base/IS_CHAT';
const IS_ERROR = 'base/IS_ERROR'

// action creators
export const isChat = createAction(IS_CHAT);
export const isError = createAction(IS_ERROR);

// initial State
const initailState = Map({
  isChat: false,
  isError: false
});

export default handleActions({
  [IS_CHAT]: (state, action) => {
    const isChat = action.payload;
    return state.set('isChat', isChat);
  },
  [IS_ERROR]: (state, action) => {
    const isError = action.payload;
    return state.set('isError', isError);
  }

}, initailState);
