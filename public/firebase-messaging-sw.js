importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDeaq2l-qJOTwvAg_drxZYQy-0Ty_-51pU",
    authDomain: "sbhacks2018.firebaseapp.com",
    databaseURL: "https://sbhacks2018.firebaseio.com",
    projectId: "sbhacks2018",
    storageBucket: "sbhacks2018.appspot.com",
    messagingSenderId: "1042786080266"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();