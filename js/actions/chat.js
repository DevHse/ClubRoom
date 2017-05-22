
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import firebase from '../firebase';

export const addMessage = msg => ({
  type: 'ADD_MESSAGE',
  ...msg,
});

export const sendMessage = (text, user) => function (dispatch) {
  const msg = {
    text,
    time: Date.now(),
    author: {
      name: user.name,
      avatar: user.avatar,
    },
  };

  const newMsgRef = firebase.database()
                                  .ref('messages')
                                  .push();
  msg.id = newMsgRef.key;
  newMsgRef.set(msg);

  dispatch(addMessage(msg));
};

export const startFetchingMessages = () => ({
  type: 'START_FETCHING_MESSAGES',
});

export const receivedMessages = () => ({
  type: 'RECEIVED_MESSAGES',
  receivedAt: Date.now(),
});


export const loadHistory = () => dispatch => new Promise((resolve) => {
  dispatch(startFetchingMessages());

  firebase.database()
                .ref('messages')
                .orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                  setTimeout(() => {
                    const messages = snapshot.val() || [];
                    resolve(messages);
                    dispatch(receiveMessages(messages));
                  }, 0);
                });
});

export const fetchMessages = () => function (dispatch) {
  dispatch(startFetchingMessages());

  firebase.database()
                .ref('messages')
                .orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                  setTimeout(() => {
                    const messages = snapshot.val() || [];
                    console.log('list message ', messages);
                    dispatch(receiveMessages(messages));
                  }, 0);
                });
};

export const receiveMessages = messages => function (dispatch) {
  Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

  dispatch(receivedMessages());
};

export const updateMessagesHeight = (event) => {
  const layout = event.nativeEvent.layout;

  return {
    type: 'UPDATE_MESSAGES_HEIGHT',
    height: layout.height,
  };
};


//
// User actions
//

export const setUserName = name => ({
  type: 'SET_USER_NAME',
  name,
});

export const setUserAvatar = avatar => ({
  type: 'SET_USER_AVATAR',
  avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
});

export const login = () => function (dispatch, getState) {
  dispatch(startAuthorizing());

  firebase.auth()
                .signInAnonymously()
                .then(() => {
                  const { name, avatar } = getState().user;

                  firebase.database()
                            .ref(`users/${DeviceInfo.getUniqueID()}`)
                            .set({
                              name,
                              avatar,
                            });

                  startChatting(dispatch);
                });
};

export const checkUserExists = () => function (dispatch) {
  dispatch(startAuthorizing());

  firebase.auth()
                .signInAnonymously()
                .then(() => firebase.database()
                                    .ref(`users/${DeviceInfo.getUniqueID()}`)
                                    .once('value', (snapshot) => {
                                      const val = snapshot.val();

                                      if (val === null) {
                                        dispatch(userNoExist());
                                      } else {
                                        dispatch(setUserName(val.name));
                                        dispatch(setUserAvatar(val.avatar));
                                        startChatting(dispatch);
                                      }
                                    }))
                .catch(err => console.log(err));
};

const startChatting = function (dispatch) {
  dispatch(userAuthorized());
  dispatch(fetchMessages());
};

export const startAuthorizing = () => ({
  type: 'USER_START_AUTHORIZING',
});

export const userAuthorized = () => ({
  type: 'USER_AUTHORIZED',
});

export const userNoExist = () => ({
  type: 'USER_NO_EXIST',
});
