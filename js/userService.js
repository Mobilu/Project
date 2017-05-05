
mobiluApp.factory('userData',function ($resource) {

  var team = "";

  this.setTeam = function(inputTeam) {
    team = inputTeam;
    console.log(team);
  }

  this.getTeam = function() {
    return team;
  }

  return this;

});