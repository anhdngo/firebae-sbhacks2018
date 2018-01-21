const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.notification = functions.firestore
.document('Items/{ItemID}')
.onDelete((event) => {
    var seller = event.data.previous.get("Owner");
    var item = event.data.previous.get("Name");
    var price = event.data.previous.get("Price");
    var data = [seller,item,price];
    var docRef = admin.firestore().collection('users').doc(data[0]);
    return docRef.get().then(function(doc){
        // Notification details.
        const payload = {
            notification: {
                title: 'You have just made a sale!',
                body: 'Congratulations '+ doc.data().Name + '! You have just sold ' + 
                        data[1] + ' for $' + data[2] + '.',
            }
        };
        return [doc.data().Token, payload]; 
    }).then((res) => {
        return admin.messaging().sendToDevice(res[0], res[1]);
    });
});

const buy = express();
buy.use(bodyParser.json())

//Handles buy request
buy.post('*', (req, res) => {

    res.redirect("/index.html");

});

//exports.buy = functions.https.onRequest(buy);

console.log("This is doing things")

const sell = express();
sell.use(bodyParser.json())

sell.post("*", (req,res) => {
    const name = req.body.name;
    const uid = req.body.owner;
    const price = req.body.price;
    const desc = req.body.description;
    const seller = req.body.sellerName;
    console.log(req.body);

    admin.firestore().collection('users').doc(uid).set({
        Name: seller,
        UID: uid
    });

    admin.firestore().collection('Items').add({
        Description: desc,
        Name: name,
        Owner: uid,
        Price: price
    });

    res.send(200);
});
//exports.sell = functions.https.onRequest(sell);