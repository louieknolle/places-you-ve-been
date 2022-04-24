// Business Logic for TravelBook ---------
function TravelBook() {
  this.destinations = {};
  this.currentId = 0;
}

TravelBook.prototype.addDestination = function (destination) {
  destination.id = this.assignId();
  this.destinations[destination.id] = destination;
}

TravelBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

TravelBook.prototype.findDestination = function(id) {
  if (this.destinations[id] != undefined) {
    return this.destinations[id];
  }
  return false;
};

// Business Logic for Destinations ---------
function Destination(location, landmarks, timeOfYear, notes, favoriteLocalFoods) {
  this.location = location;
  this.landmarks = landmarks;
  this.timeOfYear = timeOfYear;
  this.notes = notes;
  this.favoriteLocalFoods = favoriteLocalFoods;
}


// UI Logic
let travelBook = new TravelBook();

function displayTravelBook(travelBookToDisplay){
  let destinationsList = $("ul#destinations"); 
  let htmlForDestinationInfo = ""; 
  Object.keys(travelBookToDisplay.destinations).forEach(function(key) {
    const destination = travelBookToDisplay.findDestination(key); 
    htmlForDestinationInfo += "<li id=" + destination.id + ">" + destination.location + "</li>"; 
  }); 
  destinationsList.html(htmlForDestinationInfo);
}

function showDestination(destinationId) {
  const destination = travelBook.findDestination(destinationId);
  $("#show-destination").show();
  $(".location").html(destination.location);
  $(".landmarks").html(destination.landmarks);
  $(".timeOfYear").html(destination.timeOfYear);
  $(".notes").html(destination.notes);
  $(".favoriteLocalFoods").html(destination.favoriteLocalFoods);
}

function attachDestinationListeners() {
  $("ul#destinations").on("click", "li", function() {
    showDestination(this.id);
  });
}

$(document).ready(function() {
  attachDestinationListeners();
  $("#userDestinationInput").submit(function(event) {
    event.preventDefault();
    const userLocation = $("#new-location").val();
    const userLandmarks = $("#new-landmarks").val();
    const userTimeOfYear = $("#new-timeOfYear").val();
    const userNotes = $("#new-notes").val();
    const userFavoriteFoods = $("#new-favoriteLocalFoods").val();

    let newDestination = new Destination(userLocation, userLandmarks, userTimeOfYear, userNotes, userFavoriteFoods);
    travelBook.addDestination(newDestination);
    displayTravelBook(travelBook);
  });
});