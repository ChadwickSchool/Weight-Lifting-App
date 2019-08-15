import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
// import * as environment from 'src/environments/environment.test';
fdescribe('Test', () => {
  it('test2', async (done) => {
    const environment = {
      production: false,
      firebaseConfig: {
        apiKey: 'AIzaSyD7trwNDxzlXch_lxp_CRug8H3pD3o6SeQ',
        authDomain: 'test-weight-lifting-app-26052.firebaseapp.com',
        databaseURL: 'https://test-weight-lifting-app-26052.firebaseio.com',
        projectId: 'test-weight-lifting-app-26052',
        storageBucket: 'test-weight-lifting-app-26052.appspot.com',
        messagingSenderId: '12372520831',
        appId: '1:12372520831:web:c1cf4f754dba6654'
      }
    };

    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://test-weight-lifting-app-26052.firebaseio.com'
    });

    firebase.initializeApp(environment.firebaseConfig);

    const createFirebaseUser = async (uid: string) => {
      await admin
        .auth()
        .createUser({
          email: 'student-component-user' + uid + '@example.com',
          password: 'secretPassword',
          uid
        })
        .catch((error) => {
          done.fail('Error creating new user: ' + error);
        });
    };
    const createWlaUser = (uid, email) => {
      const userRef = firebase.firestore().doc(`users/${uid}`);
      const data = {
        uid,
        name: 'Tim',
        email,
        isAdmin: false
      };
      return userRef.set(data, { merge: true });
    };
    createFirebaseUser('123');
    createWlaUser('123', 'tim@gmail.com');
  });
});
