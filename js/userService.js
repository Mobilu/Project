
mobiluApp.factory('userData',function ($resource) {

  var team = '""';
  var haveBeen = '[]';
  var totalDistance = 0;

  this.setTeam = function(inputTeam) {
    team = inputTeam;
    console.log(team);
  }

  this.getTeam = function() {
    return team;
  }

  this.increaseDistance = function(value) {
    totalDistance += value;
  }

  this.getDistance = function() {
    return totalDistance;
  }

  this.getAllData = function() {
    return [team,totalDistance,haveBeen];
  }

  this.addPlace = function(place) {
    if (haveBeen == '[]') {
      haveBeen = [place];
    }
    else if (haveBeen.indexOf(place) == -1) {
      haveBeen.push(place);
      //console.log(haveBeen);
    }
  }

  this.getPlaces = function(cb) {
    if (haveBeen == '[]') {
      cb(0);
    }
    else {
      cb(haveBeen.length);
    }
  }

  this.getPlacesArray = function() {
    if (haveBeen == '[]') {
      return [];
    }
    else {
      return haveBeen
    }
  }

  return this;

})