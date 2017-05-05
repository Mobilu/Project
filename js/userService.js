
mobiluApp.factory('userData',function ($resource) {

  var team = "";
  var haveBeen = [];
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

  this.getAllData = function() {
    return [team,totalDistance,haveBeen];
  }

  this.addPlace = function(place) {
    if (haveBeen.indexOf(place) == -1) {
      haveBeen.push(place);
    }
  }

  return this;

})