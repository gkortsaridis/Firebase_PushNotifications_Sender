var admin = require('firebase-admin');
var serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bastionpassmobile.firebaseio.com"
});


//Registration token is the individual device token that we want to send the push notification.
var deviceToken = "YOUR_DEVICE_TOKEN";
//Payload to deliver an actual visible notification to the user
var payload = {
  notification: {
    title: "This is a Notification",
    body: "This is the body of the notification message."
  }
};

//Payload to deliver a silent, data-only notification
var silentPayload = {
  data: {
    extradata: "3"
  }
};
  
var options = {
  priority: "high",
  timeToLive: 60 * 60 *24
};

admin.messaging().sendToDevice(deviceToken, silentPayload, options)
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  }
);