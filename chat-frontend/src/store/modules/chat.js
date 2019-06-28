import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const CREATE = 'chat/CREATE';
const REMOVE = 'chat/REMOVE';
const ENTER = 'chat/ENTER';
const EXIT = 'chat/EXIT';
const INITIALIZE_USER_ID = 'chat/INITIALIZE_USER_ID'
const UPDATE_USER_IDS = 'chat/UPDATE_USER_IDS'
const SHOW_CREATE = 'chat/SHOW_CREATE';
const CHANGE_INPUT = 'chat/CHANGE_INPUT';

// action creators
export const create = createAction(CREATE, api.create);
export const remove = createAction(REMOVE, api.remove);
export const enter = createAction(ENTER, api.enter);
export const exit = createAction(EXIT, api.exit);
export const initializeUserId = createAction(INITIALIZE_USER_ID);
export const updateUserIds = createAction(UPDATE_USER_IDS);
export const showCreate = createAction(SHOW_CREATE);
export const changeInput = createAction(CHANGE_INPUT);

// initial State
const initailState = Map({
  chatId: null,
  title:'',
  user:'',
  inputMessage:'',
  userId: '',
  userIds: List(),
  showCreate: false,
});

export default handleActions({
  ...pender({
    type: CREATE,
    onSuccess: (state, action) => {
      const { _id } = action.payload.data;
      return state.set('chatId', _id).set('title', '').set('user', '');
    }
  }),
  [UPDATE_USER_IDS] : (state, action) => {
    const { payload: userIds } = action;
    return state.set('userIds', fromJS(userIds));
  },
  [INITIALIZE_USER_ID] : (state, action) => {
    const { payload: userId } = action;
    return state.set('userId', userId);
  },
  [SHOW_CREATE] : (state, action) => {
    const { payload: showCreate } = action;
    return state.set('showCreate', showCreate);
  },
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.set(name, value);
  },
  

}, initailState);
