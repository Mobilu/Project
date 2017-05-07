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
  var loggedInCallBack = "";
  var loggedInScope = "";
  // functions IN firebaseService

  // Getting own user-id.
  this.me = function() {
    return firebase.auth().currentUser.uid;
  }

  this.amIloggedIn = function(){
    return loggedInBool;
  }

  // LOGIN FUNCTIONS
  this.login = function(email, password,cb) {
    console.log("LOGGIN IN NOW")
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
      cb(false);
      console.log(error);
    })
      
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        cb(true)
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
  this.newAccount = function(email, password, data,cb) {
    user = firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    cb(false)
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
        cb(true);
        var userId = user.uid;
        var JSONDATA = '{"team" :"'+ data[0] +'","haveBeen" : '+data[2]+',"totalDistance" : '+ data[1] +'}'; // TODO
        firebase.database().ref('users/' + userId).set(JSON.parse(JSONDATA));
        loggedInBool = true;

        var reference = firebase.database().ref('teams/'+data[0]);
        reference.once('value', function(snapshot) {
        var teamData = JSON.parse(JSON.stringify(snapshot));
        //teamData.push(user.uid);
        console.log(teamData)
        teamData += 1;
        firebase.database().ref('teams/'+data[0]).set(teamData);
        });
      }
    });
  }

  this.getLocData = function(cb) {
    var reference = firebase.database().ref('locations');
    reference.once('value', function(snapshot) {
      cb(snapshot);
    });
  }

  this.getLocDataNumber = function(team,cb) {
    var reference = firebase.database().ref('locations');
    reference.once('value',function(snapshot){
      data = JSON.parse(JSON.stringify(snapshot));
      var sum = 0; buildings = 0;
      for (item in data){
        if (data[item] == team) {
          sum +=1;
        }
        buildings +=1;
      }
      cb([sum,buildings]);
    })
  }

  this.getMyData = function(cb) {
    var userId = firebase.auth().currentUser.uid; 
    var reference = firebase.database().ref('users/' + userId);
    reference.once('value', function(snapshot) {
      var data = JSON.parse(JSON.stringify(snapshot));
      cb(data);
    });
  }

   
  // RETURNING THIS
  return this;
});