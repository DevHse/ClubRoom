import * as firebase from 'firebase';

// should go in a secret file
const config = {
  projectId: 'clubroom-aff7b',
  messagingSenderId: '341749202937',
  storageBucket: 'clubroom-aff7b.appspot.com',
  authDomain: 'clubroom-aff7b.firebaseapp.com',
  apiKey: 'AIzaSyA_bGZznurY6anqbKyTsPuseJSnDdfk5oA',
  databaseURL: 'https://clubroom-aff7b.firebaseio.com',
};

firebase.initializeApp(config);

export default firebase;
