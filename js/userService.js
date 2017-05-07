
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
      haveBeen = [];
      console.log("YAS QWEEN");
    }
    if (haveBeen.indexOf(place) == -1) {
      haveBeen.push(place);
    }
  }

  this.getPlaces = function() {
    if (haveBeen == '[]') {
      return '';
    }
    else {
      return haveBeen
    }
  }

  return this;

})