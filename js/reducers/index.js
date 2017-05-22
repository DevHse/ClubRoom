
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import list from './list';
import chatroom from './chatroom';

export default combineReducers({

  drawer,
  user,
  list,
  cardNavigation,
  chatroom,

});
