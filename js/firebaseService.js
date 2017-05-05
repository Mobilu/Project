/*
  0. Gettin all data:
    var reference = firebase.database().ref('users');
    reference.on('value', function(snapshot) {
      //Save variable using this: = JSON.parse(JSON.stringify(snapshot));
    });
  
  1. Getting data for user: 
    var userId = firebase.auth().currentUser.uid; 
    var reference = firebase.database().ref('users/' + userId);
    reference.on('value', function(snapshot) {
      //Save variable using this: = JSON.parse(JSON.stringify(snapshot));
    });
  
  2. Setting data for user: (will write over data so be careful)
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).set(JSONDATA); // change JSONDATA to whatever variable you use.
  
  3, Gettin a location:
    var reference = firebase.database().ref('locations');
    reference.on('value', function(snapshot) {
      //Save variable using this: = JSON.parse(JSON.stringify(snapshot));
    });

*/

mobiluApp.factory('Firebase',function ($resource) {
	
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD40sRBMk5hvwGxubVhHCTeiuNdEL7iRKE",
    authDomain: "mobilu-project.firebaseapp.com",
    databaseURL: "https://mobilu-project.firebaseio.com",
    projectId: "mobilu-project",
    storageBucket: "mobilu-project.appspot.com",
    messagingSenderId: "921797799721"
  };

  firebase.initializeApp(config);

  var loggedInBool = false;

  // functions IN firebaseService

  // Getting own user-id.
  this.me = function() {
    return firebase.auth().currentUser.uid;
  }

  // LOGIN FUNCTIONS
  this.login = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
      
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        loggedInBool = true;
      }
    });
  }

  // SIGNOUT FUNCTION
  this.signOut = function(){
    firebase.auth().signOut().then(function() {
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  // NEW ACCOUNT FUNCTION
  this.newAccount = function(email, password) {
    user = firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });

    // ADDING NEW USER DATA
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        var userId = user.uid;
        var JSONDATA = '{"team" : "","haveBeen" : [],"totalDistance" : 0}'; // TODO
        firebase.database().ref('users/' + userId).set(JSON.parse(JSONDATA));
        window.location = "#/play";
      }
    });
  }

  this.getLocData = function(cb) {
    var reference = firebase.database().ref('locations');
    reference.once('value', function(snapshot) {
      cb(snapshot);
    });
  }

  this.loggedInFunc = function() {
    return loggedInBool;
  }
   
  // RETURNING THIS
  return this;
});